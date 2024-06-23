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
            password=password,
        )
        self.cursor = self.conn.cursor(dictionary=True)  # dictionary=True para obtener los resultados como diccionarios (facilita la conversión a JSON)

        # Intentamos seleccionar la base de datos
        try:
            self.cursor.execute(f"USE {database};")
        except mysql.connector.Error as err:
            # Si la base de datos no existe, la creamos
            if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                self.cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;")
                self.conn.database = database
            else:
                raise err

    # Crear la tabla de perfiles
    def create_perfiles_table(self):
        try:
            self.cursor.execute('''CREATE TABLE IF NOT EXISTS perfiles (
                id_perfil TINYINT UNSIGNED AUTO_INCREMENT,
                perfil VARCHAR(20) NOT NULL,
                PRIMARY KEY (id_perfil)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;''')
            self.conn.commit()
        except mysql.connector.Error as err:
            self.conn.rollback()
            raise err

    # Crear la tabla de usuarios
    def create_usuarios_table(self):
        try:
            self.cursor.execute('''CREATE TABLE IF NOT EXISTS usuarios (
                firstname VARCHAR(50) NOT NULL,
                lastname VARCHAR(50) NOT NULL,
                dni INT UNSIGNED NOT NULL,
                email VARCHAR(100) NOT NULL,
                clave VARCHAR(255) NOT NULL,
                id_usuario_perfil TINYINT UNSIGNED NOT NULL,
                fotografia BLOB,
                PRIMARY KEY (dni),
                FOREIGN KEY (id_usuario_perfil) REFERENCES perfiles(id_perfil)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;''')
            self.conn.commit()
        except mysql.connector.Error as err:
            self.conn.rollback()
            raise err

    # Insertar datos de ejemplo en la tabla de perfiles
    def insert_perfiles(self):
        try:
            self.cursor.execute('''INSERT IGNORE INTO perfiles (perfil)
                VALUES ('Admin'), ('Maestra/o');''')
            self.conn.commit()
        except mysql.connector.Error as err:
            self.conn.rollback()
            raise err

    # Insertar datos de ejemplo en la tabla de usuarios
    def insert_usuarios(self):
        try:
            self.cursor.execute('''INSERT IGNORE INTO usuarios (firstname, lastname, dni, email, clave, id_usuario_perfil, fotografia)
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

#     # ---------------------------------------------------------------
#     # Método para agregar un producto al catálogo
#     # ---------------------------------------------------------------
#     def agregar_producto(self, descripcion, cantidad, precio, imagen, proveedor):
#         sql = "INSERT INTO productos (descripcion, cantidad, precio, imagen_url, proveedor) VALUES (%s, %s, %s, %s, %s)"
#         valores = (descripcion, cantidad, precio, imagen, proveedor)
#         self.cursor.execute(sql, valores)
#         self.conn.commit()
#         return self.cursor.lastrowid  # Proporciona el valor de la clave primaria generada automáticamente por la base de datos para la fila recién insertada.

#     # ---------------------------------------------------------------
#     # Método para consultar un producto por código
#     # ---------------------------------------------------------------
#     def consultar_producto(self, codigo):
#         self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
#         return self.cursor.fetchone()  # fetchone devuelve un solo registro

#     # ---------------------------------------------------------------
#     # Método para modificar los detalles de un producto
#     # ---------------------------------------------------------------
#     def modificar_producto(self, codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor):
#         sql = "UPDATE productos SET descripcion = %s, cantidad = %s, precio = %s, imagen_url = %s, proveedor = %s WHERE codigo = %s"
#         valores = (nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor, codigo)
#         self.cursor.execute(sql, valores)
#         self.conn.commit()
#         return self.cursor.rowcount > 0  # rowCount() devuelve el número de filas afectadas por la consulta

#     # ---------------------------------------------------------------
#     # Método para listar todos los usuarios
#     # ---------------------------------------------------------------
    def listar_usuarios(self):
        self.cursor.execute("SELECT * FROM usuarios")
        usuarios = self.cursor.fetchall()
        return usuarios

#     # ---------------------------------------------------------------
#     # Método para eliminar un producto por código
#     # ---------------------------------------------------------------
#     def eliminar_producto(self, codigo):
#         self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
#         self.conn.commit()
#         return self.cursor.rowcount > 0  # rowCount() devuelve el número de filas afectadas por la consulta

#     # ---------------------------------------------------------------
#     # Método para mostrar los detalles de un producto por código
#     # ---------------------------------------------------------------
#     def mostrar_producto(self, codigo):
#         producto = self.consultar_producto(codigo)
#         if producto:
#             print("-" * 50)
#             print(f"Código.....: {producto['codigo']}")
#             print(f"Descripción: {producto['descripcion']}")
#             print(f"Cantidad...: {producto['cantidad']}")
#             print(f"Precio.....: {producto['precio']}")
#             print(f"Imagen.....: {producto['imagen']}")
#             print(f"Proveedor..: {producto['proveedor']}")
#             print("-" * 50)
#         else:
#             print("Producto no encontrado.")

# # -------------------------------------------------------------------
# # Cuerpo del programa
# # -------------------------------------------------------------------
#    peini = Peini(host='peini.mysql.pythonanywhere-services.com', user='peini', password='CaCTeam1PADB', database='peini$peini')


# catalogo.agregar_producto(1, 'Teclado USB 101 teclas', 10, 4500, 'teclado.jpg', 101)
# catalogo.agregar_producto(2, 'Mouse USB 3 botones', 5, 2500, 'mouse.jpg', 102)
# catalogo.agregar_producto(3, 'Monitor LED', 5, 25000, 'monitor.jpg', 102)

# Carpeta para guardar las imágenes.
    RUTA_DESTINO = '/home/peini/mysite/static/img/'

# #--------------------------------------------------------------------
# # Listar todos los usuarios
# #--------------------------------------------------------------------
@app.route("/usuarios", methods=["GET"]) #GET: método para obtener respuestas a nuestras peticiones.
def listar_usuarios():
    usuarios = peini.listar_usuarios()
    return jsonify(usuarios)

# #--------------------------------------------------------------------
# # Mostrar un solo producto según su código
# #--------------------------------------------------------------------
# @app.route("/productos/<int:codigo>", methods=["GET"])
# def mostrar_producto(codigo):
#     producto = catalogo.consultar_producto(codigo)
#     if producto:
#         return jsonify(producto), 201
#     else:
#         return "Producto no encontrado.", 404

# #--------------------------------------------------------------------
# # Agregar un producto
# #--------------------------------------------------------------------
# @app.route("/productos", methods=["POST"])
# def agregar_producto():
#     descripcion = request.form['descripcion']
#     cantidad = request.form['cantidad']
#     precio = request.form['precio']
#     imagen = request.files['imagen']
#     proveedor = request.form['proveedor']
#     nombre_imagen = secure_filename(imagen.filename)
#     nombre_base, extension = os.path.splitext(nombre_imagen)
#     nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
#     nuevo_codigo = catalogo.agregar_producto(descripcion, cantidad, precio, nombre_imagen, proveedor)
#     if nuevo_codigo:
#         imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))
#         return jsonify({"mensaje": "Producto agregado correctamente.", "codigo": nuevo_codigo, "imagen": nombre_imagen}), 201
#     else:
#         return jsonify({"mensaje": "Error al agregar el producto."}), 500

# #--------------------------------------------------------------------
# # Modificar un producto según su código
# #--------------------------------------------------------------------
# @app.route("/productos/<int:codigo>", methods=["PUT"])
# def modificar_producto(codigo):
#     nueva_descripcion = request.form.get("descripcion")
#     nueva_cantidad = request.form.get("cantidad")
#     nuevo_precio = request.form.get("precio")
#     nuevo_proveedor = request.form.get("proveedor")
#     if 'imagen' in request.files:
#         imagen = request.files['imagen']
#         nombre_imagen = secure_filename(imagen.filename)
#         nombre_base, extension = os.path.splitext(nombre_imagen)
#         nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"
#         imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))
#         producto = catalogo.consultar_producto(codigo)
#         if producto:
#             imagen_vieja = producto["imagen_url"]
#             ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)
#             if os.path.exists(ruta_imagen):
#                 os.remove(ruta_imagen)
#     else:
#         producto = catalogo.consultar_producto(codigo)
#         if producto:
#             nombre_imagen = producto["imagen_url"]
#     if catalogo.modificar_producto(codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nombre_imagen, nuevo_proveedor):
#         return jsonify({"mensaje": "Producto modificado"}), 200
#     else:
#         return jsonify({"mensaje": "Producto no encontrado"}), 403

# #--------------------------------------------------------------------
# # Eliminar un producto según su código
# #--------------------------------------------------------------------
# @app.route("/productos/<int:codigo>", methods=["DELETE"])
# def eliminar_producto(codigo):
#     producto = catalogo.consultar_producto(codigo)
#     if producto:
#         imagen_vieja = producto["imagen_url"]
#         ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)
#         if os.path.exists(ruta_imagen):
#             os.remove(ruta_imagen)
#         if catalogo.eliminar_producto(codigo):
#             return jsonify({"mensaje": "Producto eliminado"}), 200
#         else:
#             return jsonify({"mensaje": "Error al eliminar el producto"}), 500
#     else:
#         return jsonify({"mensaje": "Producto no encontrado"}), 404

# -------------------------------------------------------------------
# Configurar y ejecutar la aplicación Flask
# -------------------------------------------------------------------
if __name__ == '__main__':

    peini = Peini(host='peini.mysql.pythonanywhere-services.com', user='peini', password='CaCTeam1PADB', database='peini$peini')

    # Crear tablas y insertar datos
    peini.create_perfiles_table()
    peini.create_usuarios_table()
    peini.insert_perfiles()
    peini.insert_usuarios()

    # Cerrar conexión
    peini.close_connection()

    # Ejecutar la aplicación Flask
    app.run(debug=True, port=8000)
