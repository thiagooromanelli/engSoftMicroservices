from datetime import datetime
from flask import jsonify, make_response, abort

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/") # Local
db = client.usuarios

def get_dict_from_mongodb():
    itens_db = db.usuarios.find()
    PEOPLE = {}
    for i in itens_db:
            i.pop('_id') # retira id: criado automaticamente 
            item = dict(i)
            PEOPLE[item["login"]] = (i)
    return PEOPLE

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def read_all():
    PEOPLE = get_dict_from_mongodb()
    dict_usuarios = [PEOPLE[key] for key in sorted(PEOPLE.keys())]
    usuarios = jsonify(dict_usuarios)
    qtd = len(dict_usuarios)
    content_range = "usuarios 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    usuarios.headers['Access-Control-Allow-Origin'] = '*'
    usuarios.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    usuarios.headers['Content-Range'] = content_range
    return usuarios

def read_one(login):
    PEOPLE = get_dict_from_mongodb()
    if login in PEOPLE:
        users = PEOPLE.get(login)
    else:
        abort(
            404, "Login {login} nao encontrado".format(login=login)
        )
    return users

def login(login, password):
    PEOPLE = get_dict_from_mongodb()
    if login in PEOPLE:
        users = PEOPLE.get(login)
        if users["password"] == password:
            return make_response(
                "Usuario autenticado com sucesso!".format(login=login), 200
            )
        else:
            abort(
                404, "Usuario nao autenticado.".format(login=login)
            )
    else:
        abort(
            401, "Usuario nao autenticado.".format(login=login)
        )

def create(users):
    login = users.get("login", None)
    password = users.get("password", None)
    photo_link = users.get("photo_link", None)
    fullname = users.get("fullname", None)
    PEOPLE = get_dict_from_mongodb()
    if login not in PEOPLE and login is not None and password not in PEOPLE:
        item = {
            "fullname": fullname,
            "login": login,
            "password": password,
            "points": 0,
            "photo_link": photo_link,
            "timestamp": get_timestamp(),
        }
        db.usuarios.insert_one(item)
        return make_response(
            "'{login}' criado com sucesso".format(login=login), 201
        )
    else:
        abort(
            406,
            "Login ou password ja existente"
        )


def update_pwd(login, new_pwd):
    query = { "login": login }
    update = { "$set": {
            "password": new_pwd.get("new_pwd"),
            "timestamp": get_timestamp(), } 
        }
    PEOPLE = get_dict_from_mongodb()

    if login in PEOPLE:
        db.usuarios.update_one(query, update)
        PEOPLE = get_dict_from_mongodb()
        return PEOPLE[login]
    else:
        abort(
            404, "Usuario '{login}' nao encontrado".format(login=login)
        )


def update_points(login, points_to_update):
    query = { "login": login }
    update = { 
        "$set":{
            "timestamp": get_timestamp(),
        },
        "$inc":{
            "points": points_to_update.get("points_to_update")
        }             
    }

    PEOPLE = get_dict_from_mongodb()

    if login in PEOPLE:
        db.usuarios.update_one(query, update)
        PEOPLE = get_dict_from_mongodb()
        return PEOPLE[login]
    else:
        abort(
            404, "Usuario '{login}' nao encontrado".format(login=login)
        )

def delete(login):
    query = { "login": login }
    PEOPLE = get_dict_from_mongodb()
    if login in PEOPLE:
        db.usuarios.delete_one(query)
        return make_response(
            "{login} deletado com sucesso".format(login=login), 200
        )
    else:
        abort(
            404, "Usuario '{login}' nao encontrado".format(login=login)
        )
