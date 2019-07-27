from testpy.extensions import db


class RecyclingLabel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(20), unique=True)


class RecyclingMethod(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    method = db.Column(db.String(20), unique=True)
    detail = db.Column(db.Text)
    picture_link = db.Column(db.String(100))


class Recycling(db.Model):
    label_id = db.Column(db.Integer, db.ForeignKey(RecyclingLabel.id), primary_key=True)
    method_id = db.Column(db.Integer, db.ForeignKey(RecyclingMethod.id))
