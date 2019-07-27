from testpy.models import *


def label_schema(label):
    recycling = Recycling.query.get(label.id)
    method = RecyclingMethod.query.get(recycling.method_id)
    return {
        'id': label.id,
        'label': label.label,
        'recycling_method': method_schema(method)
    }


def method_schema(method):
    return {
        'method': method.method,
        'detail': method.detail,
        'picture_link': method.picture_link
    }
