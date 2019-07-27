import click
import os
from flask import request, url_for, jsonify
from flask_api import FlaskAPI, status, exceptions
from testpy.csvReader.csvReader import *

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


def recyclingMethodSchema(key):
    method = RecyclingMethod.query.get(key)
    return {
        'url': request.host_url.rstrip('/') + url_for('notes_detail', key=key),
        'method': method.method,
        'detail': method.detail,
        'picture_link': method.picture_link
    }


def register_router(app):
    @app.route("/", methods=['GET'])
    def notes_list():
        return [recyclingMethodSchema(method.id) for method in RecyclingMethod.query.all()]


    @app.route("/recycling_method/<int:key>/", methods=['GET'])
    def notes_detail(key):
        #if key not in recyclingMethods:
        #    raise exceptions.NotFound()
        return recyclingMethodSchema(key)


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

        readItemLableCSV("aus_recycling.csv", db)

