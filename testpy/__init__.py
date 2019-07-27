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

    @app.route("/country/", methods=['GET'])
    def getCountries():
        return [country_schema(country) for country in Country.query.all()]

    @app.route("/country/<int:country_id>", methods=['GET'])
    def getCountry(country_id):
        country = Country.query.get(country_id)
        return country_schema(country)

    @app.route("/country/<int:country_id>/method/<int:method_id>/", methods=['GET'])
    def method_detail(method_id):
        method = RecyclingMethod.query.get(method_id)
        return method_schema(method)

    @app.route("/country/<int:country_id>/label/<int:label_id>/", methods=['GET'])
    def label_detail(country_id, label_id):
        label = RecyclingLabel.query.get(label_id)
        country = Country.query.get(country_id)
        return label_schema(label, country)


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
        readCountryCSV("data/country.csv", db)
        readItemLableCSV("data/recycling_label.csv", db)

        # aus
        readClassification("data/aus/aus_recycling_method.csv", db, 0)
        readRecyclingCSV("data/aus/aus_recycling.csv", db, 0)

        # sh
        readClassification("data/sh/sh_recycling_method.csv", db, 1)
        readRecyclingCSV("data/sh/sh_recycling.csv", db, 1)


