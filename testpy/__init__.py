import click
import os
from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status, exceptions
from testpy.csvReader.csvReader import *
from testpy.schemas import *
from testpy.extensions import *
from testpy.models import *
from testpy.settings import config


def create_app(config_name=None):
    app = FlaskAPI(__name__)

    # load config
    if config_name is None:
        config_name = os.getenv('FLASK_CONFIG', 'development')
    app.config.from_object(config[config_name])

    register_router(app)
    register_extensions(app)
    register_commands(app)
    return app


def register_router(app):
    @app.route("/", methods=['GET'])
    def index():
        return [method_schema(method) for method in RecyclingMethod.query.all()]

    @app.route("/method/<int:method_id>/", methods=['GET'])
    def method_detail(method_id):
        method = RecyclingMethod.query.get(method_id)
        return method_schema(method)

    @app.route("/label/<int:label_id>/", methods=['GET'])
    def label_detail(label_id):
        label = RecyclingLabel.query.get(label_id)
        return label_schema(label)


def register_extensions(app):
    db.init_app(app)


def register_commands(app):
    @app.cli.command()
    @click.option('--drop', is_flag=True, help='Create after drop.')
    def initdb(drop):
        """Initialize the database."""
        if drop:
            click.confirm('This operation will delete the database, do you want to continue?', abort=True)
            db.drop_all()
            click.echo('Drop tables.')
        db.create_all()
        click.echo('Initialized database.')

    @app.cli.command()
    def createdb():
        db.session.add(RecyclingMethod(id=0,
                                       method='Recyclable',
                                       detail="This item can be put into the recyclable bin.",
                                       picture_link="https://www.unley.sa.gov.au/CityOfUnley/media/CoU-Media-Library/Waste%20and%20Recycling/Yellow-bin-img.jpg"))
        db.session.add(RecyclingMethod(id=1,
                                       method='Organics',
                                       detail="This item is an organics.",
                                       picture_link="https://www.unley.sa.gov.au/CityOfUnley/media/CoU-Media-Library/Waste%20and%20Recycling/Yellow-bin-img.jpg"))
        db.session.add(RecyclingMethod(id=2,
                                       method='Waste',
                                       detail="This item is totally waster. ",
                                       picture_link="https://www.unley.sa.gov.au/CityOfUnley/media/CoU-Media-Library/Waste%20and%20Recycling/Yellow-bin-img.jpg"))
        db.session.commit()

        readRecyclingCSV("data/aus_recycling.csv", db)
        readItemLableCSV("data/recycling_label.csv", db)

