// Crud

//const URL = "http://127.0.0.1:5000/";

// Al subir al servidor, deberá utilizarse la siguiente ruta. USUARIO debe ser reemplazado por el nombre de usuario de Pythonanywhere
const URL = "https://CaC2024PEINI.pythonanywhere.com/";

// Capturamos el evento de envío del formulario
document.getElementById('formulario-usuario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitamos que se envie el form

    // check_inputs();

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

    // Enviar el FormData al servidor
    fetch(URL + 'usuarios', {
        method: 'POST',
        body: formData // Aquí enviamos formData. Dado que formData puede contener archivos, no se utiliza JSON.
    })

    // Después de realizar la solicitud POST, se utiliza el método then() para manejar la respuesta del servidor.
    .then(function (response) {
        if (response.ok) {
        // Si la respuesta es exitosa, convierte los datos de la respuesta a formato JSON.
            return response.json();
        } else {
            if (response.status == 409) {
                throw new Error('Existe un usuario con ese DNI.')
            }
            // Si hubo un error, lanzar explícitamente una excepción
            // para ser "catcheada" más adelante
            throw new Error('Error al agregar el usuario.');
        }
    })

    // Respuesta OK, muestra una alerta informando que el Usuario se agregó correctamente y limpia los campos del formulario para que puedan ser utilizados para un nuevo usuario.
    .then(function (data) {
        alert('Usuario agregado correctamente.');
    })

    // En caso de error, mostramos una alerta con un mensaje de error.
    .catch(function (error) {
        alert(error);
    })

    // Limpiar el formulario en ambos casos (éxito o error)
    .finally(function () {
        nombreElement.value = "";
        apellidoElement.value = "";
        dniElement.value = "";
        emailElement.value = "";
        claveElement.value = "";
        perfilElement.value = "";
        archivoElement.value = "";
        });

    resetFormulario();
});