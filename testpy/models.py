from testpy.extensions import db


class Country(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(20), unique=True)


class RecyclingLabel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(20), unique=True)


class RecyclingMethod(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    method = db.Column(db.String(20), unique=True)
    detail = db.Column(db.Text)
    picture_link = db.Column(db.String(100))


class CountryRecyclingMethod(db.Model):
    country_id = db.Column(db.Integer, db.ForeignKey(Country.id))
    method_id = db.Column(db.Integer, db.ForeignKey(RecyclingMethod.id))


class Recycling(db.Model):
    label_id = db.Column(db.Integer, db.ForeignKey(RecyclingLabel.id))
    method_id = db.Column(db.Integer, db.ForeignKey(RecyclingMethod.id))
    coutry_id = db.Column(db.Integer, db.ForeignKey(Country.id))
