#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask import Flask, request, render_template, Response
from redis import Redis
from socketio import socketio_manage
from gevent import monkey
from battle import BattleNamespace




redis = Redis()

app = Flask(__name__)
app.config.from_pyfile('config.py')

from models import *
db.init_app(app)

monkey.patch_all()

@app.route('/')
def hello_world():
    return render_template('base.html')


@app.route('/socket.io/<path:path>')
def run_socketio(path):
    real_request = request._get_current_object()
    socketio_manage(request.environ, {'': BattleNamespace},
                    request=real_request)
    return Response()


if __name__ == '__main__':
    app.run()