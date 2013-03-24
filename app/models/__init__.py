#!/usr/bin/env python2
# -*- coding: UTF-8 *-*

from flask.ext.sqlalchemy import SQLAlchemy
from app.constant import TYPES


db = SQLAlchemy()

__all__ = ['User', 'Monster', 'Attak', 'db']


class Fight(db.Model):
    __tablename__ = 'fight'

    id = db.Column(db.Integer, primary_key=True)

    fb_id1 = db.Column(db.Integer, db.ForeignKey('user.fb_id'))
    fb_id2 = db.Column(db.Integer, db.ForeignKey('user.fb_id'))

    result = db.Column(db.Boolean) # True if fb_id1 win, False otherwise

    def who_won(self):
        return self.fb_id1 if self.result else self.fb_id2

class User(db.Model):

    __tablename__ = 'user'

    fb_id = db.Column(db.BigInteger, primary_key=True)
    monsters = db.relationship("Monster")
    fights = db.relationship("Fight", primaryjoin="or_(Fight.fb_id1==User.fb_id, Fight.fb_id2==User.fb_id)")

    def __init__(self, fb_id):
        self.fb_id = fb_id


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

    belong_to = db.Column(db.Integer, db.ForeignKey('user.fb_id'))

class Attak(db.Model):

    __tablename__ = 'attak'

    id = db.Column(db.Integer, primary_key=True)
    atk_name = db.Column(db.String, unique=True)
    type = db.Column(db.Enum(*TYPES, name="type"), nullable=False)
    dmg = db.Column(db.Integer)
    desc = db.Column(db.Text)
    pp = db.Column(db.Integer)
