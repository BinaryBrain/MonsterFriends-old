#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask import current_app
from redis import Redis

import json

from socketio.namespace import BaseNamespace
from socketio.mixins import RoomsMixin
from gevent import monkey

from models import User, Monster, Attak, db

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

class RedisBattle(object):

    def __init__(self, redis_conn):
        self.r = redis_conn

    def in_a_fight(self, fbid):
        return self.r.get("f:h:{fbid}".format(fbid=fbid)) is not None

    def add_new_fight(self, fbid, eid):
        self.r.set("f:c:{fbid}".format(fbid=fbid), eid)
        self.r.set("f:c:{eid}".format(eid=eid), fbid)

    def get_last_history(self, fbid):
        return self.r.lrange('f:h:r:{fbid}'.format(fbid), 0, 10) or []

class BattleNamespace(BaseNamespace):

    # TODO Gérer Redis !!!

    def initialize(self):
        self.fbid = None
        self.eid = None
        self.r = RedisBattle(Redis())

    @property
    def in_a_fight(self):
        return self.r.in_a_fight(self.fbid)

    def is_in_a_fight(self, fbid):
        return self.r.in_a_fight(fbid) is not None

    @staticmethod
    def get_socket_with_fbid(nm, fbid):
        for _, socket in nm.socket.server.sockets.iteritems():
            if hasattr(socket, "fbid") and socket.fbid == fbid:
                return socket


    def on_hello(self, fbid):
        self.fbid = fbid
        u = User.query.filter_by(fbid=self.fbid).first()
        if u is None:
            u = User(fbid)
            db.session.add(u)
            db.session.commit()
        self.eid = self.in_a_fight
        self.emit("welcome")
        return True

    def on_get_current_fight(self):
        if not self.fbid:
            self.emit("error", "Hello has not been sent, I can't fetch your history :(")
            return True
        self.emit("current_fight", self.in_a_fight or 0)

    def on_ask_fight(self, eid):
        if self.fbid == eid:
            self.emit('error', "You can't fight against yourself...")
            return True
        elif self.in_a_fight:
            self.emit('error', "You're already in a fight.")
            return True

        if self.is_in_a_fight(eid):
            self.emit('error', "Your opponent is already in a fight")
            return True

        self.emit("ok_fight")

        s = self.get_socket_with_fbid(self, eid)
        if s:
            s.emit("new_fight", self.fbid)

        self.r.add_new_fight(self.fbid, eid)
        return True


    def on_get_history(self):
        if not self.fbid:
            self.emit("error", "Hello has not been sent, I can't fetch your history :(")
            return True
        h = self.r.get_last_history(self.fbid)
        self.emit("history", json.dumps(h))
        return True

    def on_get_monsters(self):
        if not self.fbid:
            self.emit("error", "Hello has not been sent, I can't fetch your history :(")
            return True

        user = User.query.filter_by(fbid=self.fbid).first()

        self.emit("monsters", json.dumps(user.monsters) or json.dumps([]))

