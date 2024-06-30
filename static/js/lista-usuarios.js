
let listUsuarios = []; // variable global

const URL = "http://127.0.0.1:5000/"

// Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
//const URL = "https://USUARIO.pythonanywhere.com/"


// Realizamos la solicitud GET al servidor para obtener todos los productos.
fetch(URL + 'gestion_usuario')
  .then(function (response) {
    if (response.ok) {
      //Si la respuesta es exitosa (response.ok), convierte el cuerpo de la respuesta de formato JSON a un objeto JavaScript y pasa estos datos a la siguiente promesa then.
      return response.json();
    } else {
      // Si hubo un error, lanzar explícitamente una excepción para ser "catcheada" más adelante
      throw new Error('Error al obtener los usuarios.');
    }
  })

  //Esta función maneja los datos convertidos del JSON.
  .then(function (data) {
    let tablaUsuarios = document.getElementById('tablaUsuarios'); //Selecciona el elemento del DOM donde se mostrarán los productos.
    listUsuarios = data
    /// Iteramos sobre cada producto y agregamos filas a la tabla
    for (let usuarios of data) {
      let fila = document.createElement('tr'); //Crea una nueva fila de tabla (<tr>) para cada producto.
      fila.innerHTML = // Mostrar miniatura de la imagen
        '<td><img src=../static/img/' + usuarios.fotografia + ' alt="Imagen del producto" style="width: 80px;"></td>' +
        '<td>' + usuarios.firstname + '</td>' +
        '<td>' + usuarios.lastname + '</td>' +
        '<td>' + usuarios.dni + '</td>' +
        '<td>' + usuarios.email + '</td>' +
        '<td>' + usuarios.perfil + '</td>' +
        '<td>' + '<i class="fas fa-edit actions" onclick="openEditForm(' + usuarios.dni + ')"></i>'
        + '<i class="fas fa-trash actions" onclick="eliminarUsuario(' + usuarios.dni + ')"></i>'
      '</td>';
      //Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
      //'<td><img src=https://www.pythonanywhere.com/user/USUARIO/files/home/USUARIO/mysite/static/imagenes/' + producto.imagen_url +' alt="Imagen del producto" style="width: 100px;"></td>' + '<td align="right">' + producto.proveedor + '</td>';

      //Una vez que se crea la fila con el contenido del producto, se agrega a la tabla utilizando el método appendChild del elemento tablaProductos.
      tablaUsuarios.appendChild(fila);
    }

  })

  //Captura y maneja errores, mostrando una alerta en caso de error al obtener los productos.
  .catch(function (error) {
    // Código para manejar errores
    alert('Error al obtener los productos.');
  });


// Se utiliza para eliminar un producto.
function eliminarUsuario(dni) {
  // Se muestra un diálogo de confirmación. Si el usuario confirma, se realiza una solicitud DELETE al servidor a través de fetch(URL + 'productos/${codigo}', {method: 'DELETE' }).
  if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
    fetch(URL + `gestion_usuario/${dni}`, { method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          // Si es exitosa (response.ok), elimina el producto y da mensaje de ok.
          alert('Usuario eliminado correctamente.');
        }
      })
      // En caso de error, mostramos una alerta con un mensaje de error.
      .catch(error => {
        alert(error.message);
      });
  }
}

// Function to create a table row
function createRow(usuarios) {
  const tr = document.createElement('tr');

  tr.innerHTML =
    '<td><img src=../static/img/' + usuarios.fotografia + ' alt="Imagen del producto" style="width: 80px;"></td>' +
    '<td>' + usuarios.firstname + '</td>' +
    '<td>' + usuarios.lastname + '</td>' +
    '<td>' + usuarios.dni + '</td>' +
    '<td>' + usuarios.email + '</td>' +
    '<td>' + usuarios.perfil + '</td>' +
    '<td>' + '<i class="fas fa-edit actions" onclick="openEditForm(' + usuarios.dni + ')"></i>'
    + '<i class="fas fa-trash actions" onclick="eliminarUsuario(' + usuarios.dni + ')"></i>'
    + ' </td>';

  return tr;
}

/// Function to render the table
function renderTable(data) {
  const tbody = document.querySelector('#dataTable tbody');
  tbody.innerHTML = ''; // Clear existing rows
  data.forEach(usuarios => {
    tbody.appendChild(createRow(usuarios));
  });
}

// Search functionality
document.getElementById('searchInput')?.addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  console.log(searchTerm);
  console.log(listUsuarios);
  const filteredData = listUsuarios.filter(usuarios => {
    console.log(usuarios);
    return usuarios.firstname.toLowerCase().includes(searchTerm) ||
      usuarios.lastname.toLowerCase().includes(searchTerm);
  });
  console.log(filteredData);
  renderTable(filteredData);
});

// Open the modal
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];
const formTitle = document.getElementById('formTitle');
const userForm = document.getElementsByClassName('userForm');

span.onclick = function () {
  closeForm();
}

window.onclick = function (event) {
  if (event.target == modal) {
    closeForm();
  }
}

function openForm() {
  formTitle.textContent = '';
  userForm.reset();
  modal.style.display = 'block';
}

function openEditForm(dni) {
  const usuarios = listUsuarios.find(p => p.dni === dni);
  if (usuarios) {
    formTitle.textContent = '';
    document.getElementById('usuario-archivo').src = usuarios.fotografia;
    document.getElementById('usuario-firstname').value = usuarios.firstname;
    document.getElementById('usuario-lastname').value = usuarios.lastname;
    document.getElementById('usuario-dni').value = usuarios.dni;
    document.getElementById('usuario-email').value = usuarios.email;
    document.getElementById('usuario-perfil').value = usuarios.id_usuario_perfil;
    document.getElementById('usuario-password').value = usuarios.password
    document.getElementById('usuario-password2').value = usuarios.password
    editingUsuario = usuarios;
    modal.style.display = 'block';
  }
}

function closeForm() {
  modal.style.display = 'none';
}


document.getElementById('formulario-usuario').addEventListener('submit', function (event) {
  event.preventDefault(); // Evitamos que se envie el form
  // Seleccionar los elementos del formulario
  const nombreElement = document.getElementById('usuario-firstname');
  const apellidoElement = document.getElementById('usuario-lastname');
  const dniElement = document.getElementById('usuario-dni');
  const emailElement = document.getElementById('usuario-email');
  const claveElement = document.getElementById('usuario-password');
  const perfilElement = document.getElementById('usuario-perfil');
  const archivoElement = document.getElementById('usuario-archivo');

  // Extraer los valores de los ID
  const nombre = nombreElement.value;
  const apellido = apellidoElement.value;
  const dni = dniElement.value;
  const email = emailElement.value;
  const clave = claveElement.value;
  const perfil = perfilElement.value;
  const fotografia = archivoElement.files[0]; // Asumiendo que es un archivo


  // Imprimir valores en la consola
  console.log("Nombre: ", nombre);
  console.log("Apellido: ", apellido);
  console.log("DNI: ", dni);
  console.log("Email: ", email);
  console.log("Clave: ", clave);
  console.log("Perfil: ", perfil);
  console.log("Fotografía: ", fotografia);


  // Crear un nuevo objeto FormData
  const formData = new FormData();

  // Agregar los valores al FormData
  formData.append('firstname', nombre);
  formData.append('lastname', apellido);
  formData.append('dni', dni);
  formData.append('email', email);
  formData.append('password', clave);
  formData.append('perfil', perfil);
  formData.append('archivo', fotografia);

  fetch(URL + `gestion_usuario/${dni}`, { method: 'PUT', body: formData, })
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Error al guardar los cambios del usuario.')
      }
    })
    .then(data => {
      alert('Usuario actualizado correctamente.');
      limpiarFormulario();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al actualizar el usuario.');
    });
});