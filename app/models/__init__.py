#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask.ext.sqlalchemy import SQLAlchemy
from app.constant import TYPES


db = SQLAlchemy()

__all__ = ['User', 'Monster', 'Attak', 'db']

class User(db.Model):

    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    fb_id = db.Column(db.BigInteger, unique=True)
    monsters = db.relationship("Monster")


class Monster(db.Model):

    __tablename__ = 'monster'

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
    type1 = db.Column(db.Enum(*TYPES, name="type"))
    type2 = db.Column(db.Enum(*TYPES, name="type"))
    atk1_id = db.Column(db.Integer, db.ForeignKey('attak.id'))
    atk2_id = db.Column(db.Integer, db.ForeignKey('attak.id'))
    atk3_id = db.Column(db.Integer, db.ForeignKey('attak.id'))
    atk4_id = db.Column(db.Integer, db.ForeignKey('attak.id'))

    belong_to = db.Column(db.Integer, db.ForeignKey('user.id'))

class Attak(db.Model):

    __tablename__ = 'attak'

    id = db.Column(db.Integer, primary_key=True)
    atk_name = db.Column(db.String, unique=True)
    type = db.Column(db.Enum(*TYPES, name="type"), nullable=False)
    dmg = db.Column(db.Integer)
    desc = db.Column(db.Text)
    pp = db.Column(db.Integer)

