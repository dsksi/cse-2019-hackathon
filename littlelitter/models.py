from littlelitter.extensions import db
from sqlalchemy import PrimaryKeyConstraint


class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(20), unique=True)


class RecyclingLabel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(20), unique=True)


class RecyclingMethod(db.Model):
    __table_args__ = (
        PrimaryKeyConstraint('id', 'country_id'),
    )

    id = db.Column(db.Integer)
    country_id = db.Column(db.Integer, db.ForeignKey(Country.id))

    method = db.Column(db.String(20), unique=True)
    detail = db.Column(db.Text)
    picture_link = db.Column(db.String(100))



class CountryRecyclingMethod(db.Model):
    __table_args__ = (
        PrimaryKeyConstraint('country_id', 'method_id'),
    )

    country_id = db.Column(db.Integer, db.ForeignKey(Country.id))
    method_id = db.Column(db.Integer, db.ForeignKey(RecyclingMethod.id))



class Recycling(db.Model):
    __table_args__ = (
        PrimaryKeyConstraint('label_id', 'country_id'),
    )

    label_id = db.Column(db.Integer, db.ForeignKey(RecyclingLabel.id))
    method_id = db.Column(db.Integer, db.ForeignKey(RecyclingMethod.id))
    country_id = db.Column(db.Integer, db.ForeignKey(Country.id))
