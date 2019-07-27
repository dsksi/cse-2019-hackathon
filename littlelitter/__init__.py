import os
import click
from flask import Flask, render_template, jsonify, request
from flask_api import FlaskAPI

from littlelitter.apis.v1 import api_v1

from littlelitter.extensions import db, csrf
from littlelitter.models import *
from littlelitter.settings import config


def create_app(config_name=None):
    if config_name is None:
        config_name = os.getenv('FLASK_CONFIG', 'development')

    app = FlaskAPI(__name__)
    app.config.from_object(config[config_name])

    register_test(app)
    register_extensions(app)
    register_blueprints(app)
    register_commands(app)
    register_errors(app)
    return app


def register_extensions(app):
    db.init_app(app)
    csrf.init_app(app)
    csrf.exempt(api_v1)


def register_blueprints(app):
    app.register_blueprint(api_v1, url_prefix='/api/v1')
    # app.register_blueprint(api_v1, url_prefix='/v1', subdomain='api')  # enable subdomain support


def register_test(app):
    # TODO this is mainly for testing
    pass


def register_errors(app):
    # TODO error handling
    pass


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
