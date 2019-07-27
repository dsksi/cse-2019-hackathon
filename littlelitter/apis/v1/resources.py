from flask import jsonify
from flask.views import MethodView

from littlelitter.apis.v1 import api_v1
from littlelitter.models import *


class RecyclingAPI(MethodView):

    def get(self, label):
        label_id = RecyclingLabel.query().filter_by(RecyclingLabel.label == label).first()
        recycling_method = Recycling.query().get(label_id)
        return jsonify(recycling_method)


# add methodview to the url
api_v1.add_url_rule('/recycling/<string:recycling_item_name>',
                    view_func=RecyclingAPI.as_view('recycling_item_name'),
                    methods=['GET'])
