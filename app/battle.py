#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask import current_app
from redis import Redis

from socketio.namespace import BaseNamespace
from socketio.mixins import RoomsMixin
from gevent import monkey

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

class BattleNamespace(BaseNamespace):

    # TODO Gérer Redis !!!

    def initialize(self):
        self.fbid = None
        self.eid = None
        self.in_fight = False
        self.redis = Redis()


    def on_hello(self, fbid):
        self.fbid = fbid
        # TODO: check if the state we're in

    def on_ask_fight(self, eid):
        if self.fbid == eid:
            self.emit('error', "You can't fight against yourself...")
            return True
        if not self.in_fight:
            for _, socket in self.socket.server.sockets.iteritems():
                if hasattr(socket, 'fbid') and socket.fbid == eid:
                    if socket.in_fight: # already in a fight
                        self.emit('reject_fight')
                        return True
                    else: # not in fight: accepted
                        self.emit('fight', None) # TODO send fight data
                        socket.emit('') # new fight
                        return True
        else:
            self.emit('error', 'Already in a fight.')
            return True



