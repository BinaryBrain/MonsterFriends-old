#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask import Flask
from redis import Redis

redis = Redis()

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
