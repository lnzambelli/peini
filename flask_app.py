# Instalar con pip install Flask
from flask import Flask
from flask import request
from flask import jsonify
from flask import render_template

# Instalar con pip install flask-cors
from flask_cors import CORS

# Instalar con pip install mysql-connector-python
import mysql.connector

# Si es necesario, pip install Werkzeug
from werkzeug.utils import secure_filename

# Es parte del sistema standard de Python (no es necesario instalar)
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
# Definimos la clase peini
# -------------------------------------------------------------------

class peini:

# Constructor de la clase

     def __init__(self, host, user, password, database):

#         # Primero, establecemos una conexión sin especificar la base de datos
         self.conn = mysql.connector.connect(
             host='peini.mysql.pythonanywhere-services.com',
             user='peini',
             password='CaCTeam1PADB',
             database='peini$peini'
             
         )
         self.cursor = self.conn.cursor()

#         # Intentamos seleccionar la base de datos
         try:
             self.cursor.execute(f"USE {database}")
         except mysql.connector.Error as err:
#             # Si la base de datos no existe, la creamos
             if err.errno == mysql.connector.errorcode.ER_BAD_DB_ERROR:
                 self.cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database}")
                 self.conn.database = database
             else:
                 raise err

#         # Una vez que la base de datos está establecida, creamos la tabla si no existe
#         self.cursor.execute('''CREATE TABLE IF NOT EXISTS productos (
#             codigo INT AUTO_INCREMENT PRIMARY KEY,
#             descripcion VARCHAR(255) NOT NULL,
#             cantidad INT(4) NOT NULL,
#             precio DECIMAL(10, 2) NOT NULL,
#             imagen_url VARCHAR(255),
#             proveedor INT(3))''')
#         self.conn.commit()

#         # Cerrar el cursor inicial y abrir uno nuevo con el parámetro dictionary=True
#         self.cursor.close()
#         self.cursor = self.conn.cursor(dictionary=True)




#     # ---------------------------------------------------------------
#     # Método para agregar un producto al catálogo
#     # ---------------------------------------------------------------
#     def agregar_producto(self, descripcion, cantidad, precio, imagen, proveedor):
               
#         sql = "INSERT INTO productos (descripcion, cantidad, precio, imagen_url, proveedor) VALUES (%s, %s, %s, %s, %s)"
#         valores = (descripcion, cantidad, precio, imagen, proveedor)

#         self.cursor.execute(sql, valores)        
#         self.conn.commit()
#         return self.cursor.lastrowid #proporciona el valor de la clave primaria generada automáticamente por la base de datos para la fila recién insertada.


#     # ---------------------------------------------------------------
#     # Método para consultar un producto por código
#     # ---------------------------------------------------------------   
#     def consultar_producto(self, codigo):
#         # Buscamos el producto en la tabla
#         self.cursor.execute(f"SELECT * FROM productos WHERE codigo = {codigo}")
#         return self.cursor.fetchone() #fetchone devuelve un sólo registro


#     # ---------------------------------------------------------------
#     # Método para modificar los detalles de un producto
#     # ---------------------------------------------------------------
#     def modificar_producto(self, codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor):
#         sql = "UPDATE productos SET descripcion = %s, cantidad = %s, precio = %s, imagen_url = %s, proveedor = %s WHERE codigo = %s"
#         valores = (nueva_descripcion, nueva_cantidad, nuevo_precio, nueva_imagen, nuevo_proveedor, codigo)
#         self.cursor.execute(sql, valores)
#         self.conn.commit()
#         return self.cursor.rowcount > 0 #rowCount() devuelve el número de filas afectadas por la consulta        


#     # ---------------------------------------------------------------
#     # Método para listar todos los productos en el catálogo
#     # ---------------------------------------------------------------
#     def listar_productos(self):
#         self.cursor.execute("SELECT * FROM productos")
#         productos = self.cursor.fetchall()
#         return productos


#     # ---------------------------------------------------------------
#     # Método para eliminar un producto por código
#     # ---------------------------------------------------------------
#     def eliminar_producto(self, codigo):
#         self.cursor.execute(f"DELETE FROM productos WHERE codigo = {codigo}")
#         self.conn.commit()
#         return self.cursor.rowcount > 0 #rowCount() devuelve el número de filas afectadas por la consulta
   

#     # ---------------------------------------------------------------
#     # Método para mostrar los detalles de un producto por código
#     # ---------------------------------------------------------------
#     def mostrar_producto(self, codigo):
#         # Consultamos el producto por su código
#         producto = self.consultar_producto(codigo)
#         if producto:
#             # Imprimimos los detalles del producto
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
# catalogo = Catalogo(host='localhost', user='root', password='root', database='miapp')


# catalogo.agregar_producto(1, 'Teclado USB 101 teclas', 10, 4500, 'teclado.jpg', 101)
# catalogo.agregar_producto(2, 'Mouse USB 3 botones', 5, 2500, 'mouse.jpg', 102)
# catalogo.agregar_producto(3, 'Monitor LED', 5, 25000, 'monitor.jpg', 102)

# # Carpeta para guardar las imagenes.
# RUTA_DESTINO = './static/imagenes/'

# #--------------------------------------------------------------------
# # Listar todos los productos
# #--------------------------------------------------------------------
# #La ruta Flask /productos con el método HTTP GET está diseñada para proporcionar los detalles de todos los productos almacenados en la base de datos.
# #El método devuelve una lista con todos los productos en formato JSON.
# @app.route("/productos", methods=["GET"]) #GET: método para obtener respuestas a nuestras peticiones.
# def listar_productos():
#     productos = catalogo.listar_productos()
#     return jsonify(productos)



# #--------------------------------------------------------------------
# # Mostrar un sólo producto según su código
# #--------------------------------------------------------------------
# #La ruta Flask /productos/<int:codigo> con el método HTTP GET está diseñada para proporcionar los detalles de un producto específico basado en su código.
# #El método busca en la base de datos el producto con el código especificado y devuelve un JSON con los detalles del producto si lo encuentra, o None si no lo encuentra.
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
# #La ruta Flask `/productos` con el método HTTP POST está diseñada para permitir la adición de un nuevo producto a la base de datos.
# #La función agregar_producto se asocia con esta URL y es llamada cuando se hace una solicitud POST a /productos.
# def agregar_producto():
#     #Recojo los datos del form
#     descripcion = request.form['descripcion']
#     cantidad = request.form['cantidad']
#     precio = request.form['precio']
#     imagen = request.files['imagen']
#     proveedor = request.form['proveedor']  
#     nombre_imagen=""

    
#     # Genero el nombre de la imagen
#     nombre_imagen = secure_filename(imagen.filename) #Chequea el nombre del archivo de la imagen, asegurándose de que sea seguro para guardar en el sistema de archivos
#     nombre_base, extension = os.path.splitext(nombre_imagen) #Separa el nombre del archivo de su extensión.
#     nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}" #Genera un nuevo nombre para la imagen usando un timestamp, para evitar sobreescrituras y conflictos de nombres.

#     nuevo_codigo = catalogo.agregar_producto(descripcion, cantidad, precio, nombre_imagen, proveedor)
#     if nuevo_codigo:    
#         imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))

#         #Si el producto se agrega con éxito, se devuelve una respuesta JSON con un mensaje de éxito y un código de estado HTTP 201 (Creado).
#         return jsonify({"mensaje": "Producto agregado correctamente.", "codigo": nuevo_codigo, "imagen": nombre_imagen}), 201
#     else:
#         #Si el producto no se puede agregar, se devuelve una respuesta JSON con un mensaje de error y un código de estado HTTP 500 (Internal Server Error).
#         return jsonify({"mensaje": "Error al agregar el producto."}), 500
    

# #--------------------------------------------------------------------
# # Modificar un producto según su código
# #--------------------------------------------------------------------
# @app.route("/productos/<int:codigo>", methods=["PUT"])
# #La ruta Flask /productos/<int:codigo> con el método HTTP PUT está diseñada para actualizar la información de un producto existente en la base de datos, identificado por su código.
# #La función modificar_producto se asocia con esta URL y es invocada cuando se realiza una solicitud PUT a /productos/ seguido de un número (el código del producto).
# def modificar_producto(codigo):
#     #Se recuperan los nuevos datos del formulario
#     nueva_descripcion = request.form.get("descripcion")
#     nueva_cantidad = request.form.get("cantidad")
#     nuevo_precio = request.form.get("precio")
#     nuevo_proveedor = request.form.get("proveedor")
    
    
#     # Verifica si se proporcionó una nueva imagen
#     if 'imagen' in request.files:
#         imagen = request.files['imagen']
#         # Procesamiento de la imagen
#         nombre_imagen = secure_filename(imagen.filename) #Chequea el nombre del archivo de la imagen, asegurándose de que sea seguro para guardar en el sistema de archivos
#         nombre_base, extension = os.path.splitext(nombre_imagen) #Separa el nombre del archivo de su extensión.
#         nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}" #Genera un nuevo nombre para la imagen usando un timestamp, para evitar sobreescrituras y conflictos de nombres.

#         # Guardar la imagen en el servidor
#         imagen.save(os.path.join(RUTA_DESTINO, nombre_imagen))
        
#         # Busco el producto guardado
#         producto = catalogo.consultar_producto(codigo)
#         if producto: # Si existe el producto...
#             imagen_vieja = producto["imagen_url"]
#             # Armo la ruta a la imagen
#             ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)

#             # Y si existe la borro.
#             if os.path.exists(ruta_imagen):
#                 os.remove(ruta_imagen)
    
#     else:
#         # Si no se proporciona una nueva imagen, simplemente usa la imagen existente del producto
#         producto = catalogo.consultar_producto(codigo)
#         if producto:
#             nombre_imagen = producto["imagen_url"]


#     # Se llama al método modificar_producto pasando el codigo del producto y los nuevos datos.
#     if catalogo.modificar_producto(codigo, nueva_descripcion, nueva_cantidad, nuevo_precio, nombre_imagen, nuevo_proveedor):
        
#         #Si la actualización es exitosa, se devuelve una respuesta JSON con un mensaje de éxito y un código de estado HTTP 200 (OK).
#         return jsonify({"mensaje": "Producto modificado"}), 200
#     else:
#         #Si el producto no se encuentra (por ejemplo, si no hay ningún producto con el código dado), se devuelve un mensaje de error con un código de estado HTTP 404 (No Encontrado).
#         return jsonify({"mensaje": "Producto no encontrado"}), 403



# #--------------------------------------------------------------------
# # Eliminar un producto según su código
# #--------------------------------------------------------------------
# @app.route("/productos/<int:codigo>", methods=["DELETE"])
# #La ruta Flask /productos/<int:codigo> con el método HTTP DELETE está diseñada para eliminar un producto específico de la base de datos, utilizando su código como identificador.
# #La función eliminar_producto se asocia con esta URL y es llamada cuando se realiza una solicitud DELETE a /productos/ seguido de un número (el código del producto).
# def eliminar_producto(codigo):
#     # Busco el producto en la base de datos
#     producto = catalogo.consultar_producto(codigo)
#     if producto: # Si el producto existe, verifica si hay una imagen asociada en el servidor.
#         imagen_vieja = producto["imagen_url"]
#         # Armo la ruta a la imagen
#         ruta_imagen = os.path.join(RUTA_DESTINO, imagen_vieja)

#         # Y si existe, la elimina del sistema de archivos.
#         if os.path.exists(ruta_imagen):
#             os.remove(ruta_imagen)

#         # Luego, elimina el producto del catálogo
#         if catalogo.eliminar_producto(codigo):
#             #Si el producto se elimina correctamente, se devuelve una respuesta JSON con un mensaje de éxito y un código de estado HTTP 200 (OK).
#             return jsonify({"mensaje": "Producto eliminado"}), 200
#         else:
#             #Si ocurre un error durante la eliminación (por ejemplo, si el producto no se puede eliminar de la base de datos por alguna razón), se devuelve un mensaje de error con un código de estado HTTP 500 (Error Interno del Servidor).
#             return jsonify({"mensaje": "Error al eliminar el producto"}), 500
#     else:
#         #Si el producto no se encuentra (por ejemplo, si no existe un producto con el codigo proporcionado), se devuelve un mensaje de error con un código de estado HTTP 404 (No Encontrado). 
#         return jsonify({"mensaje": "Producto no encontrado"}), 404



# -------------------------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)