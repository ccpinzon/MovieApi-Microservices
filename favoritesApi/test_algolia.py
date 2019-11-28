# coding=utf-8

import time

from algoliasearch import algoliasearch
from common import constants as cons
import json
import datetime

client = algoliasearch.Client(cons.APP_ID, cons.APY_KEY)
index = client.init_index(cons.INDEX)

response = index.search('', {
    'filters': 'userId:"0e9fef36-8f77-41b6-b43e-972942cca12f" AND toSee:True'
})
#'userId:"0e9fef36-8f77-41b6-b43e-972942cca12" AND toSee:True'
for hit in response['results']:
    print(str(hit))
