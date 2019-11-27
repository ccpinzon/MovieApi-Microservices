# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# [START gae_python37_app]
from flask import Flask, request, jsonify
from managers import algolia_manager as manager

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)


@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    return 'Flask Api Google AppEngine'


@app.route('/user', methods=['POST'])
def create_user():
    res = manager.create_anonymous_user()
    return jsonify(res)


@app.route('/movie/favorite', methods=['POST'])
def save_favorite_movie():
    data = request.get_json()
    user_id = data.get("idUser")
    movie_id = data.get("idMovie")
    res = manager.set_movie_favorite(user_id, movie_id)
    return jsonify(res)


@app.route('/movie/toSee', methods=['POST'])
def save_to_see_movie():
    data = request.get_json()
    user_id = data.get("idUser")
    movie_id = data.get("idMovie")
    res = manager.set_movie_to_see(user_id, movie_id)
    return jsonify(res)


if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_python37_app]
