from flask import render_template
import connexion
from flask_cors import CORS

app = connexion.App(__name__, specification_dir='./')

app.add_api('swagger.yml')
CORS(app.app,resources=r'/api/*',methods=['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'])


@app.route('/')
def home():
    return render_template('/AdminLTE-master/pages/examples/login.html')


@app.route('/registrar')
def registrar():
    return render_template('/AdminLTE-master/pages/examples/register.html')


@app.route('/principal')
def principal():
    
    return render_template('/AdminLTE-master/index.html')
    #return render_template('login.html')

@app.route('/inicial')
def inicial():
    return render_template('inicial.html')


@app.route('/lerQRCode')
def lerQRcode():
    return render_template('lerQRCode.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

