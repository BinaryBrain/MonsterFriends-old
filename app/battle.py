#!/usr/bin/env python2
# -*- coding: UTF-8 *-*
from flask import current_app

from redis import Redis

import json

from socketio.namespace import BaseNamespace
from gevent import monkey

from models import User, Monster, Attak, db

from monsterfriends import app

import logging
logging.basicConfig(level=logging.DEBUG)

monkey.patch_all()

# class FlaskNamespace(BaseNamespace):
#     def __init__(self, *args, **kwargs):
#         request = kwargs.get('request', None)
#         self.ctx = None
#         if request:
#             self.ctx = current_app.request_context(request.environ)
#             self.ctx.push()
#             current_app.preprocess_request()
#             del kwargs['request']
#         super(BaseNamespace, self).__init__(*args, **kwargs)
#
#     def disconnect(self, *args, **kwargs):
#         if self.ctx:
#             self.ctx.pop()
#         super(BaseNamespace, self).disconnect(*args, **kwargs)

class DatabaseBattle(object):

    def __init__(self, redis_conn, db_conn):
        self.r = redis_conn
        self.db = db_conn

    def in_a_fight(self, fbid):
        return self.r.get("f:h:{fbid}".format(fbid=fbid)) is not None

    def add_new_fight(self, fbid, eid, info_dict):
        self.r.set("f:c:{fbid}".format(fbid=fbid), eid)
        self.r.set("f:c:{eid}".format(eid=eid), fbid)

        fid = self._get_formated_id(fbid, eid)

        self.r.set("f:c:{fid}".format(fid=fid), json.dumps(info_dict))

    def remove_fight(self, fbid, eid=None):
        if eid is None:
            eid = self.r.get("f:c:{fbid}".format(fbid))

        fid = self._get_formated_id(fbid, eid)

        self.r.delete("f:c:{fbid}".format(fbid=fbid))
        self.r.delete("f:c:b:{id}".format(id=fid))
        self.r.delete("f:c:{eid}".format(eid=eid))

    def get_last_history(self, fbid):
        return self.r.lrange('f:h:r:{fbid}'.format(fbid=fbid), 0, 10) or []

    def add_game_result(self, fbid, eid, result):
        self.r.lpush("f:h:r:{fbid}".format(fbid=fbid), json.dumps((eid, result)))
        self.r.lpush("f:h:r:{eid}".format(eid=eid), json.dumps((fbid, not result)))

    def get_current_fight_info(self, fbid):
        eid = self.r.get("f:c:{fbid}".format(fbid=fbid))
        fid = self._get_formated_id(fbid, eid)

        info = self.r.hgetall("f:c:{id}".format(id=fid))
        return info

    def update_fight_info(self, fbid, info_dict):
        eid = self.r.get("f:c:{fbid}".format(fbid=fbid))
        fid = self._get_formated_id(fbid, eid)

        self.r.set("f:c:{fid}".format(fid=fid), json.dumps(info_dict))


    def _get_formated_id(self, fbid, eid):
        return "{fbid} - {eid}".format(fbid=min(fbid, eid), eid=max(fbid, eid))




class BattleNamespace(BaseNamespace):

    def initialize(self):
        self.fbid = None
        self.eid = None
        self.r = DatabaseBattle(Redis(), db)

    @property
    def in_a_fight(self):
        return self.r.in_a_fight(self.fbid)

    def is_in_a_fight(self, fbid):
        return self.r.in_a_fight(fbid) is not None

    def get_socket_with_fbid(self, fbid):
        for _, socket in self.socket.server.sockets.iteritems():
            if hasattr(socket, "fbid") and socket.fbid == fbid:
                return socket


    def on_hello(self, fbid):
        logging.debug("Receive hello from {}".format(fbid))

        if fbid is None:
            self.emit("error", "I need a Facebook ID to work !")
            return True

        self.fbid = fbid
        with app.app_context():
            u = User.query.filter_by(fb_id=self.fbid).first()
            if u is None:
                u = User(self.fbid)
                db.session.add(u)
                db.session.commit()
        self.eid = self.in_a_fight
        self.emit("welcome")
        return True

    def on_get_current_fight(self):
        logging.debug("On current fight from {}".format(self.fbid))
        if not self.fbid:
            self.emit("error", "Hello has not been sent, I can't know your current fight :(")
            return True
        self.emit("current_fight", self.in_a_fight or 0)

    def on_ask_fight(self, eid):
        logging.debug("On ask fight from {}".format(self.fbid))
        if self.fbid == eid:
            self.emit('error', "You can't fight against yourself...")
            return True

        with app.app_context():
            if User.query.filter_by(fb_id=eid).first() is None:
                self.emit('error', "The user asked is not in the database. Ask him on Facebook ?")
                return True

        if self.in_a_fight:
            self.emit('error', "You're already in a fight.")
            return True

        if self.is_in_a_fight(eid):
            self.emit('error', "Your opponent is already in a fight")
            return True

        self.emit("ok_fight")

        s = self.get_socket_with_fbid(eid)
        if s:
            s.emit("new_fight", self.fbid)

        info_dict = {}

        monster_1 = Monster.query.filter_by(belong_to=self.fbid).first()
        monster_2 = Monster.query.filter_by(belong_to=eid).first()

        first_player = self.fbid if monster_1.speed >= monster_2.speed else eid

        with app.app_context():
            info_dict = {
                'current_player': first_player,
                self.fbid: monster_1.get_stats(),
                eid: monster_2.get_stats()
            }

        self.r.add_new_fight(self.fbid, eid, info_dict)
        return True

    def on_get_fight_info(self):
        logging.debug("On get fight info from {}".format(self.fbid))
        if not self.fbid:
            self.emit("error", "Hello has not been sent, I can't do shit :(")
            return True

        if not self.in_a_fight:
            self.emit("error", "You're not in a fight, I can't send you the info...")
            return True

        current_info = self.r.get_current_fight_info(self.fbid)

        self.emit("fight_info", json.dumps(current_info))

    def on_attack(self, aid):
        logging.debug("On attach from {}".format(self.fbid))
        current_info = self.r.get_current_fight_info(self.fbid)

        if current_info["current_player"] is not self.fbid:
            self.emit("error", "IT IS NOT YOUR TURN §")
            return True

        my_monster = current_info[self.fbid]
        opponent_monster = current_info[self.eid]

        dmg = None

        for atk in my_monster["atks"]:
            if atk["id"] == aid:
                if atk["pp"] < atk["pp_cost"]:
                    self.emit("error", "You don't have enough pp")
                    return True
                dmg = atk["dmg"]
                break

        if dmg is None:
            self.emit("error", "No attak found for this aid")
            return True

        opponent_monster["pv"] = 0 if opponent_monster["pv"] - dmg < 0 else opponent_monster["pv"] - dmg

        self.emit("fight_info", json.dumps(current_info))

        eid = self.eid

        if opponent_monster["pv"] <= 0:
            self.eid = None

        current_info["current_player"] = self.eid
        self.r.update_fight_info(self.fbid, current_info)

        if opponent_monster["pv"] <= 0:
            self.r.remove_fight(self.fbid, eid)

        s = self.get_socket_with_fbid(eid)
        if s is not None:
            s.emit("fight_info", current_info)

        return True


    def on_get_history(self):
        logging.debug("On get history from {}".format(self.fbid))
        if not self.fbid:
            self.emit("error", "Hello has not been sent, I can't fetch your history :(")
            return True
        h = self.r.get_last_history(self.fbid)
        self.emit("history", json.dumps(h))
        return True

    def on_get_monsters(self):
        logging.debug("On get monsters from {}".format(self.fbid))
        if not self.fbid:
            self.emit("error", "Hello has not been sent, I can't fetch your monsters book :(")
            return True

        with app.app_context():
            user = User.query.filter_by(fb_id=self.fbid).first()
        if user is None:
            self.emit("error", "You're not in our database. This is a problem. Please contact us.")
            return False

        self.emit("monsters", json.dumps(user.monsters or []))

