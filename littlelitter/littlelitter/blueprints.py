from flask_cors import CORS
from flask import Blueprint, jsonify
from flask.views import MethodView
from littlelitter.schemas import *
from littlelitter.models import *
import random

api_v1 = Blueprint('api_v1', __name__)
CORS(api_v1)


class IndexAPI(MethodView):
    def get(self):
        return jsonify([method_schema(method) for method in RecyclingMethod.query.all()])


class GetCountriesAPI(MethodView):
    def get(self):
        return jsonify([country_schema(country) for country in Country.query.all()])


class GetCountryAPI(MethodView):
    def get(self, country_id):
        country = Country.query.get(country_id)
        return country_schema(country)


class GetMethodAPI(MethodView):
    def get(self, method_id):
        method = RecyclingMethod.query.get(method_id)
        return method_schema(method)


class GetLabelAPI(MethodView):
    def get(self, country_id, label):
        label = RecyclingLabel.query.filter(RecyclingLabel.label == label).first()
        country = Country.query.get(country_id)
        return label_schema(label, country)

class GetVolunteerAPI(MethodView):
    def get(self, country_id):
        volunteer_id = random.randint(0, 2)
        volunteer_image = VolunteerImage.query.get(volunteer_id)
        methods = RecyclingMethod.query.filter(RecyclingMethod.country_id == country_id)
        return {"volunteer": volunteer_schema(volunteer_image),
                "methods": [method_schema(method) for method in methods]}


api_v1.add_url_rule('/', view_func=IndexAPI.as_view('index'), methods=['GET'])
api_v1.add_url_rule('/country/', view_func=GetCountriesAPI.as_view('getCountries'), methods=['GET'])
api_v1.add_url_rule('/country/<int:country_id>/', view_func=GetCountryAPI.as_view('getCountry'), methods=['GET'])
api_v1.add_url_rule('/country/<int:country_id>/method/<int:method_id>/', view_func=GetMethodAPI.as_view('getMethod'), methods=['GET'])
api_v1.add_url_rule('/country/<int:country_id>/label/<string:label>/', view_func=GetLabelAPI.as_view('getLabel'), methods=['GET'])
api_v1.add_url_rule('/country/<int:country_id>/volunteer/', view_func=GetVolunteerAPI.as_view('getVolunteer'), methods=['GET'])
