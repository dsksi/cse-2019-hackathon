from flask_cors import CORS
from flask import Blueprint, Flask, request, url_for, jsonify
from littlelitter.schemas import *
from littlelitter.models import *

api_v1 = Blueprint('api_v1', __name__)
CORS(api_v1)


@api_v1.route("/", methods=['GET'])
def index():
    return jsonify([method_schema(method) for method in RecyclingMethod.query.all()])


@api_v1.route("/country/", methods=['GET'])
def getCountries():
    return jsonify([country_schema(country) for country in Country.query.all()])


@api_v1.route("/country/<int:country_id>", methods=['GET'])
def getCountry(country_id):
    country = Country.query.get(country_id)
    return country_schema(country)


@api_v1.route("/country/<int:country_id>/method/<int:method_id>/", methods=['GET'])
def method_detail(method_id):
    method = RecyclingMethod.query.get(method_id)
    return method_schema(method)


@api_v1.route("/country/<int:country_id>/label/<int:label_id>/", methods=['GET'])
def label_detail(country_id, label_id):
    label = RecyclingLabel.query.get(label_id)
    country = Country.query.get(country_id)
    return label_schema(label, country)
