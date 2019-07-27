from littlelitter.models import *
from flask import jsonify


def country_schema(country):
    methods = RecyclingMethod.query.filter(RecyclingMethod.country_id == country.id)
    return {
        'id': country.id,
        'country': country.country,
        'methods': [method_schema(method) for method in methods]
    }


def label_schema(label, country):
    recycling = Recycling.query.get((label.id, country.id))
    method = RecyclingMethod.query.get((recycling.method_id, country.id))
    return {
        'id': label.id,
        'label': label.label,
        'country': country.country,
        'recycling_method': method_schema(method)
    }


def method_schema(method):
    return {
        'method': method.method,
        'detail': method.detail,
        'picture_link': method.picture_link
    }

def volunteer_schema(volunteer_image):
    return {
        'id': volunteer_image.id,
        'image_link': volunteer_image.image_link
    }
