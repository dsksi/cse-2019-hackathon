import click
import os
from flask import Flask, request, url_for, jsonify
from flask_api import FlaskAPI
from littlelitter.csvReader.csvReader import *
from littlelitter.schemas import *
from littlelitter.extensions import *
from littlelitter.models import *
from littlelitter.settings import config
from littlelitter.blueprints import *


def create_app(config_name=None):

    # load config
    if config_name is None:
        config_name = os.getenv('FLASK_CONFIG', 'development')

    if config_name == 'development':
        app = FlaskAPI(__name__)
    else:
        app = Flask(__name__)

    app.config.from_object(config[config_name])
    register_router(app)
    register_extensions(app)
    register_commands(app)
    return app


def register_router(app):
    app.register_blueprint(api_v1)


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
        readCountryCSV(os.path.join(os.path.dirname(__file__), 'data/country.csv'), db)
        readItemLableCSV(os.path.join(os.path.dirname(__file__), "data/recycling_label.csv"), db)

        # aus
        readClassification(os.path.join(os.path.dirname(__file__), "data/aus/aus_recycling_method.csv"), db, 0)
        readRecyclingCSV(os.path.join(os.path.dirname(__file__), "data/aus/aus_recycling.csv"), db, 0)

        # sh
        readClassification(os.path.join(os.path.dirname(__file__), "data/sh/sh_recycling_method.csv"), db, 1)
        readRecyclingCSV(os.path.join(os.path.dirname(__file__), "data/sh/sh_recycling.csv"), db, 1)


