#!/usr/bin/env python2
# -*- coding: UTF-8 *-*
import os

SQLALCHEMY_DATABASE_URI = 'postgresql://test:test@localhost:5432/monsterfriends'
SQLALCHEMY_ECHO = True
DEBUG = os.getenv('MONSTERFRIENDS_DEBUG', True)
