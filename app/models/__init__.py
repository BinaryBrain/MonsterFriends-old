#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask.ext.sqlalchemy import SQLAlchemy
from app.constant import TYPES


db = SQLAlchemy()

__all__ = ['User', 'Monster', 'Attak', 'db']

class User(db.Model):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    fb_id = db.Column(db.BigInteger)

class Monster(db.Model):

    __tablename__ = 'monsters'

    id = db.Column(db.Integer, primary_key=True)
    attack = db.Column(db.Integer)
    defense = db.Column(db.Integer)
    atk_spe = db.Column(db.Integer)
    def_spe = db.Column(db.Integer)
    speed = db.Column(db.Integer)
    level = db.Column(db.Integer)
    xp = db.Column(db.BigInteger)
    pv_max = db.Column(db.Integer)
    pp_max = db.Column(db.Integer)
    type1 = db.Column(db.Enum(*TYPES))
    type2 = db.Column(db.Enum(*TYPES))
    atk1_id = db.Column(db.Integer, db.ForeignKey('attaks.id'))
    atk2_id = db.Column(db.Integer, db.ForeignKey('attaks.id'))
    atk3_id = db.Column(db.Integer, db.ForeignKey('attaks.id'))
    atk4_id = db.Column(db.Integer, db.ForeignKey('attaks.id'))

class Attak(db.Model):

    __tablename__ = 'attaks'

    id = db.Column(db.Integer, primary_key=True)
    atk_name = db.Column(db.String, unique=True)
    type = db.Column(db.Enum(*TYPES))
    dmg = db.Column(db.Integer)
    desc = db.Column(db.Text)
    pp = db.Column(db.Integer)

