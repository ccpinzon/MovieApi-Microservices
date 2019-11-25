from algoliasearch import algoliasearch
from common import constants as cons
import uuid

client = algoliasearch.Client(cons.APP_ID, cons.APY_KEY)
index = client.init_index(cons.INDEX)


def create_anonymous_user():
    user_uuid = uuid.uuid4()
    obj_res = {'userId': user_uuid}
    return obj_res
