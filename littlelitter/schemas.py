from littlelitter.models import *


def country_schema(country):
    return {
        'id': country.id,
        'country': country.country
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
