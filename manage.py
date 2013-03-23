#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask.ext.script import Manager

from app.monsterfriends import app, db

from app.models import User, Attak, Monster

manager = Manager(app)

def init_db():
    db.create_all()


if __name__ == "__main__":
    manager.run()
