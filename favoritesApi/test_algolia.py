# coding=utf-8

import time

from algoliasearch import algoliasearch
from common import constants as cons
import json
import datetime

client = algoliasearch.Client(cons.APP_ID, cons.APY_KEY)
index = client.init_index(cons.INDEX)

response = index.get_objects(['TEST_ID'])

for hit in response['results']:
    print(str(hit))
