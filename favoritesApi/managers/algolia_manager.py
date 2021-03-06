from algoliasearch import algoliasearch
from common import constants as cons
import requests
import uuid

client = algoliasearch.Client(cons.APP_ID, cons.APY_KEY)
index = client.init_index(cons.INDEX)


def create_anonymous_user():
    user_uuid = uuid.uuid4()
    obj_res = {'userId': user_uuid}
    return obj_res


def generate_object_id(user_id, movie_id):
    if (user_id is not None and user_id) and (movie_id is not None and movie_id):
        user_id_split = str(user_id).split('-')[0].upper() + str(movie_id)
        return user_id_split
    return None


def get_movie_info(movie_id, name_type):
    if movie_id and name_type:
        if name_type == "movie":
            res = requests.get("https://api-gateway-dot-movieapp-microservices.appspot.com/movie/" + str(movie_id))
        else:
            res = requests.get("https://api-gateway-dot-movieapp-microservices.appspot.com/tv/" + str(movie_id))

        if res and res.json():
            print(str(res.json()))
            return res.json()
    return None


def add_movie_to_user(obj_to_save):
    res = {
        "code": "Error",
        "message": "No fue posible guardar la info"
    }
    if obj_to_save:

        try:
            user_id = str(obj_to_save['userId'])
            movie_id = str(obj_to_save['movieId'])
            name_type = str(obj_to_save['type'])

            obj_to_save["objectID"] = generate_object_id(user_id, movie_id)
            obj_to_save["movieInfo"] = get_movie_info(movie_id, name_type)
            index.partial_update_object(obj_to_save)
            res["code"] = "OK"
            res["message"] = "Saved Movie"
        except Exception as e:
            res["message"] = str(e)

    return res


def set_movie_to_see(user_id, movie_id, name_type):
    object_to_save = None
    if (user_id is not None and user_id) and (movie_id is not None and movie_id):
        object_to_save = {
            "userId": user_id,
            "movieId": movie_id,
            "toSee": True,
            "type": name_type
        }
    return add_movie_to_user(object_to_save)


def set_movie_favorite(user_id, movie_id, name_type):
    object_to_save = None
    if (user_id is not None and user_id) and (movie_id is not None and movie_id):
        object_to_save = {
            "userId": user_id,
            "movieId": movie_id,
            "favorite": True,
            "type": name_type
        }
    return add_movie_to_user(object_to_save)


def clean_algolia_data(response_algolia):
    movies_list = []
    for hit in response_algolia['hits']:
        movie = hit['movieInfo']
        movies_list.append(movie)
    return movies_list


def get_movies_from_user(user_id, type_filter_movie):
    obj_res = {
        "userId": str(user_id),
        "filterBy": str(type_filter_movie)
    }
    query_filter = 'userId:"' + str(user_id) + '" AND ' + str(type_filter_movie) + ':True'
    print('filter algolia -> ' + str(query_filter))
    res = index.search('', {
        'filters': str(query_filter)
    })

    obj_res["movies"] = clean_algolia_data(res)

    return obj_res
