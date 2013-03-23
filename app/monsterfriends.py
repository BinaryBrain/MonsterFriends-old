#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask import Flask, request, render_template
from redis import Redis
from socketio import socketio_manage
from gevent import monkey

redis = Redis()

app = Flask(__name__)
app.config.from_pyfile('config.py')

from models import *
db.init_app(app)

monkey.patch_all()

@app.route('/')
def hello_world():
    return render_template('base.html')

if __name__ == '__main__':
    app.run()
