#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask import Flask, request
from redis import Redis
from socketio import socketio_manage
from gevent import monkey


redis = Redis()

app = Flask(__name__)
app.debug = True

from models import *
db.init_app(app)

monkey.patch_all()

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/socket.io/<path:path>')
def run_socketio(path):
    socketio_manage(request.environ, {'/default': DefaultNamespace})


if __name__ == '__main__':
    app.run()
