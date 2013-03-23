#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask import current_app

from socketio.namespace import BaseNamespace
from gevent import monkey

monkey.patch_all()

class FlaskNamespace(BaseNamespace):
    def __init__(self, *args, **kwargs):
        request = kwargs.get('request', None)
        self.ctx = None
        if request:
            self.ctx = current_app.request_context(request.environ)
            self.ctx.push()
            current_app.preprocess_request()
            del kwargs['request']
        super(BaseNamespace, self).__init__(*args, **kwargs)

    def disconnect(self, *args, **kwargs):
        if self.ctx:
            self.ctx.pop()
        super(BaseNamespace, self).disconnect(*args, **kwargs)



