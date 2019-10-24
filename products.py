from datetime import datetime
from flask import jsonify, make_response, abort

from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/") # Local
db = client.products

def get_dict_from_mongodb():
    itens_db = db.products.find()
    PRODUCTS = {}
    for i in itens_db:
            i.pop('_id') # retira id: criado automaticamente 
            item = dict(i)
            PRODUCTS[item["product_name"]] = (i)
    return PRODUCTS

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

def read_all_products():
    PRODUCTS = get_dict_from_mongodb()
    dict_products = [PRODUCTS[key] for key in sorted(PRODUCTS.keys())]
    products = jsonify(dict_products)
    qtd = len(dict_products)
    content_range = "products 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    products.headers['Access-Control-Allow-Origin'] = '*'
    products.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    products.headers['Content-Range'] = content_range
    return products

def create_new_product(product):
    product_name = product.get("product_name", None)
    product_type = product.get("product_type", None)
    product_photo_link = product.get("product_photo_link", None)
    points = product.get("points", None)
    PRODUCTS = get_dict_from_mongodb()
    if product_name not in PRODUCTS and product_name is not None:
        item = {
            "product_name": product_name,
            "product_type": product_type,
            "points": points,
            "product_photo_link":product_photo_link,
            "timestamp": get_timestamp(),
        }
        db.products.insert_one(item)
        return make_response(
            "Produto '{product_name}' criado com sucesso".format(product_name=product_name), 201
        )
    else:
        abort(
            406,
            "Produto ja existente"
        )

def update_points(product_name, points_to_update):
    query = { "product_name": product_name }
    update = { "$set": {
            "points": points_to_update.get("points_to_update"),
            "timestamp": get_timestamp(), } 
        }
    PRODUCTS = get_dict_from_mongodb()

    if product_name in PRODUCTS:
        db.products.update_one(query, update)
        PRODUCTS = get_dict_from_mongodb()
        return PRODUCTS[product_name]
    else:
        abort(
            404, "Produto '{product_name}' nao encontrado".format(product_name=product_name)
        )

def delete(product_name):
    query = { "product_name": product_name }
    PRODUCTS = get_dict_from_mongodb()
    if product_name in PRODUCTS:
        db.products.delete_one(query)
        return make_response(
            "{product_name} deletado com sucesso".format(product_name=product_name), 200
        )
    else:
        abort(
            404, "Usuario '{product_name}' nao encontrado".format(product_name=product_name)
        )
