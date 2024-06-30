# Instalar con pip install Flask
from flask import Flask, request, jsonify, render_template

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# Es parte del sistema estándar de Python (no es necesario instalar)
import os
import time

# Creamos una instancia de la aplicación Flask
app = Flask(__name__)

# Se habilita CORS para la aplicación Flask.
# CORS es una característica de seguridad en los navegadores que restringe cómo los recursos en una página web
# pueden ser solicitados desde otro dominio distinto del que sirvió la página original.
# Al habilitar CORS, se permite que los recursos de la aplicación web sean accesibles desde otros dominios,
# lo cual es necesario en muchos casos, como cuando se desarrolla una API que necesita ser consumida desde diferentes dominios.
CORS(app)

@app.route('/')
def index():
    return 'Hola, mundo! Esta es mi primera aplicación Flask en PythonAnywhere.'

# -------------------------------------------------------------------
# Definimos la clase Peini
# -------------------------------------------------------------------

class Peini:

    # Constructor de la clase
    def __init__(self, host, user, password, database):
        self.conn = mysql.connector.connect(
            host=host,
            user=user,
            password=password)
        self.cursor = self.conn.cursor(dictionary=True)  # dictionary=True para obtener los resultados como diccionarios (facilita la conversión a JSON)

        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database};")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database};")
                self.conn.database = database
            else:
                raise err

    # Crear la tabla de perfiles
    def crear_tabla_perfiles(self):
        try:
            self.cursor.execute('''CREATE TABLE IF NOT EXISTS perfiles (
                id_perfil TINYINT UNSIGNED AUTO_INCREMENT,
                perfil VARCHAR(20) NOT NULL,
                PRIMARY KEY (id_perfil));''')
            self.conn.commit()
        except mysql.connector.Error as err:
            self.conn.rollback()
            raise err

    # Insertar datos de ejemplo en la tabla de perfiles
    def insertar_perfiles(self):
        try:
            self.cursor.execute('''INSERT IGNORE INTO perfiles (perfil)
                VALUES ('Admin'), ('Maestra/o');''')
            self.conn.commit()
        except mysql.connector.Error as err:
            self.conn.rollback()
            raise err
        
    # Crear la tabla de usuarios
    def crear_tabla_usuarios(self):
        try:
            self.cursor.execute('''CREATE TABLE IF NOT EXISTS usuarios (
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                dni INT UNSIGNED NOT NULL,
                email VARCHAR(100) NOT NULL,
                clave VARCHAR(255) NOT NULL,
                id_usuario_perfil TINYINT UNSIGNED NOT NULL,
                imagen VARCHAR(255),
                PRIMARY KEY (dni),
                FOREIGN KEY (id_usuario_perfil) REFERENCES perfiles(id_perfil)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;''')
            self.conn.commit()
        except mysql.connector.Error as err:
            self.conn.rollback()
            raise err

    # Insertar datos de ejemplo en la tabla de usuarios
    def insertar_usuarios(self):
        try:
            self.cursor.execute('''INSERT IGNORE INTO usuarios (firstname, lastname, dni, email, clave, id_usuario_perfil, imagen)
                VALUES
                    ('Juan', 'Pérez', 11111111, 'juan@example.com', 'password123', 1, NULL),
                    ('María', 'González', 22222222, 'maria@example.com', 'securepwd', 2, NULL),
                    ('Pedro', 'Sánchez', 33333333, 'pedro@example.com', '1234pass', 1, NULL),
                    ('Ana', 'López', 44444444, 'ana@example.com', 'p@ssw0rd', 2, NULL),
                    ('Lucía', 'Martínez', 55555555, 'lucia@example.com', 'mypassword', 1, NULL);''')
            self.conn.commit()
        except mysql.connector.Error as err:
            self.conn.rollback()
            raise err

    # Método para cerrar la conexión y el cursor
    def close_connection(self):
        self.cursor.close()
        self.conn.close()

    # ---------------------------------------------------------------
    # Método para agregar un usuario a la base
    # ---------------------------------------------------------------
    def agregar_usuario(self, firstname, lastname, dni, email, clave, id_usuario_perfil, imagen):
        try:

            sql = "INSERT INTO usuarios (firstname, lastname, dni, email, clave, id_usuario_perfil, fotografia) VALUES (%s, %s, %s, %s, %s, %s, %s)"
            valores = (firstname, lastname, dni, email, clave, id_usuario_perfil, imagen)
            self.cursor.execute(sql, valores)
            self.conn.commit()
            return dni  # Proporciona el valor de la clave primaria (generada automáticamente) por la base de datos para la fila recién insertada.
        except mysql.connector.Error as err:
            self.conn.rollback()
            print(err.errno)
            print(err.sqlstate)
            raise err
        
    # ---------------------------------------------------------------
    # Método para consultar un usuario por código
    # ---------------------------------------------------------------
    def consultar_usuario(self, dni):
        self.cursor.execute(f"SELECT * FROM usuarios WHERE dni = {dni}")
        return self.cursor.fetchone()  # fetchone devuelve un solo registro

     # ---------------------------------------------------------------
     # Método para modificar los detalles de un usuario
     # ---------------------------------------------------------------
    def modificar_usuario(self, nuevo_firstname, nuevo_lastname, nuevo_email, nuevo_clave, nuevo_id_usuario_perfil, nuevo_imagen, dni):
        sql = "UPDATE usuarios SET firstname = %s, lastname = %s, email = %s, clave = %s, id_usuario_perfil = %s, fotografia = %s WHERE dni = %s"
        valores = (nuevo_firstname, nuevo_lastname, dni, nuevo_email, nuevo_clave, nuevo_id_usuario_perfil, nuevo_imagen)
        self.cursor.execute(sql, valores)
        self.conn.commit()
        return self.cursor.rowcount > 0  # rowCount() devuelve el número de filas afectadas por la consulta

    # ---------------------------------------------------------------
    # Método para listar todos los usuarios
    # ---------------------------------------------------------------
    def listar_usuarios(self):
        self.cursor.execute("SELECT u.*, p.perfil AS perfil FROM usuarios u JOIN  perfiles p ON u.id_usuario_perfil = p.id_perfil ")
        usuarios = self.cursor.fetchall()
        print(usuarios)
        return usuarios

    # ---------------------------------------------------------------
    # Método para eliminar un usuario por DNI
    # ---------------------------------------------------------------
    def eliminar_usuario(self, dni):
        self.cursor.execute(f"DELETE FROM usuarios WHERE dni = {dni}")
        self.conn.commit()
        return self.cursor.rowcount > 0  # rowCount() devuelve el número de filas afectadas por la consulta

    # ---------------------------------------------------------------
    # Método para mostrar los detalles de un usuario por DNI
    # ---------------------------------------------------------------
    def mostrar_usuario(self, dni):
        usuario = self.consultar_usuario(dni)
        if usuario:
            print("-" * 50)
            print(f"Nombre......: {usuario['firstname']}")
            print(f"Apellido....: {usuario['lastname']}")
            print(f"Documento...: {usuario['dni']}")
            print(f"Correo......: {usuario['email']}")
            print(f"Perfil......: {usuario['id_usuario_perfil']}")
            print(f"Imagen......: {usuario['imagen']}")
            print("-" * 50)
        else:
            print("Usuario no encontrado.")

# -------------------------------------------------------------------
# Cuerpo del programa
# -------------------------------------------------------------------
#peini = Peini(host='CaC2024PEINI.mysql.pythonanywhere-services.com', user='CaC2024PEINI', password='CaCTeam1PADB', database='CaC2024PEINI$miDB')
peini = Peini(host='localhost', user='root', password='Fedeel14', database='CaC2024PEINI$miDB')


# Carpeta para guardar las imágenes.
RUTA_DESTINO = './static/img/'

# #--------------------------------------------------------------------
# # Listar todos los usuarios
# #--------------------------------------------------------------------
@app.route("/gestion_usuario", methods=["GET"]) #GET: método para obtener respuestas a nuestras peticiones.
def listar_usuarios():
    usuarios = peini.listar_usuarios()
    return jsonify(usuarios)

#--------------------------------------------------------------------
# Mostrar un sólo usuario según su DNI
#--------------------------------------------------------------------
@app.route("/gestion_usuario/<int:dni>", methods=["GET"])
def mostrar_usuario(dni):
    usuario = peini.consultar_usuario(dni)
    if usuario:
        return jsonify(usuario), 201
    else:
        return "Usuario no encontrado.", 404

#--------------------------------------------------------------------
# Agregar un usuario
#--------------------------------------------------------------------
@app.route("/gestion_usuario", methods=["POST"])
def agregar_usuario():
    try:
        nombre = request.form['firstname']
        apellido = request.form['lastname']
        documento = request.form['dni']
        correo = request.form['email']
        clave = request.form['password']
        perfil = request.form['perfil']
        imagen = request.files['archivo']

         # Genero el nombre de la imagen
        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
       
        # Agregar usuario a la base de datos
        peini.agregar_usuario(nombre, apellido, documento, correo, clave, perfil, nombre_imagen)

        # Guardar imagen si la operación fue exitosa
        if nombre_imagen:
            imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))
            return jsonify({"mensaje": "Usuario agregado correctamente.", "dni": documento, "imagen": nombre_imagen}), 201
        else:
            return jsonify({"mensaje": "Error al agregar al usuario en la base de datos."}), 500

    except mysql.connector.Error as err:
        if err.errno == 1062:
             return jsonify({"mensaje": "Existe un usuario con ese DNI."}), 409
        # Registrar y capturar el error
        print(f"Error al agregar usuario: {err}")
        return jsonify({"mensaje": "Error interno del servidor."}), 500


#--------------------------------------------------------------------
# Modificar un usuario según su dni
#--------------------------------------------------------------------
@app.route("/gestion_usuario/<int:dni>", methods=["PUT"])
def modificar_usuario(dni):
    nuevo_firstname  = request.form.get("firstname")
    nuevo_lastname = request.form.get("lastname")
    nuevo_email = request.form.get("email")
    nuevo_clave = request.form.get("password")
    nuevo_id_usuario_perfil = request.form.get("perfil")
    nuevo_imagen = request.form.get("archivo")
    
    if 'fotografia' in request.files:
        # Genero el nombre de la imagen
        imagen = request.files['fotografia']
        nombre_imagen = secure_filename(imagen.filename)
        nombre_base, extension = os.path.splitext(nombre_imagen)
        nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
        
        #Guardar imagen si la operación fue exitosa
        imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))
        usuario = peini.consultar_usuario(dni)

        if usuario:
            imagen_vieja = usuario['fotografia']
            ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)
            if os.path.exists(ruta_imagen):
                os.remove(ruta_imagen)
    else:
        usuario = peini.consultar_usuario(dni)
        if usuario:
            nombre_imagen = usuario["fotografia"]
    if peini.modificar_usuario(nuevo_firstname, nuevo_lastname, nuevo_email, nuevo_clave, nuevo_id_usuario_perfil, nuevo_imagen, dni):
        return jsonify({"mensaje": "Usuario modificado"}), 200
    else:
        return jsonify({"mensaje": "Usuario no encontrado"}), 403

#--------------------------------------------------------------------
# Eliminar un usuario según su dni
#--------------------------------------------------------------------
@app.route("/gestion_usuario/<int:dni>", methods=["DELETE"])
def eliminar_usuario(dni):
    usuario = peini.consultar_usuario(dni)
    if usuario:
        imagen_vieja = usuario["fotografia"]
        ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)
        if os.path.exists(ruta_imagen):
            os.remove(ruta_imagen)
        if peini.eliminar_usuario(dni):
            return jsonify({"mensaje": "Usuario eliminado"}), 200
        else:
            return jsonify({"mensaje": "Error al eliminar el usuario"}), 500
    else:
        return jsonify({"mensaje": "Usuario no encontrado"}), 404

# -------------------------------------------------------------------
# Configurar y ejecutar la aplicación Flask
# -------------------------------------------------------------------
if __name__ == '__main__':

     # Ejecutar la aplicación Flask
    app.run(debug=True)
