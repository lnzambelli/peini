// defino el formulario de para ralizar las comparativas 

//ABM Usuario
const formulario = document.getElementById('formulario-registro');
const inputs = document.querySelectorAll('#formulario-registro input');


// defino las expreciones regurlares para controlar los inputs
const expresiones = {
	nombre: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	apellido: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	dni: /^.{6,14}$/, // 6 a 14 digitos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^.{8,12}$/, // 8 a 12 digitos.

}

const campos = {
	nombre: false,
	apellido: false,
	dni: false,
	password: false,
	email: false,
	telefono: false,
}


// función tipo flecha de validacion

const validarCampo = (expresion, input, campo,formulario) => {

	debugger;
	//se llama a la funcion test y devuelve un booleano comparando con la expresion que definimos
	if (expresion.test(input.value)) {

		document.getElementById(`form-${campo}-${formulario}`).classList.remove('form-formulario-error');
		document.getElementById(`form-${campo}-${formulario}`).classList.add('form-formulario-correcto');
		document.querySelector(`#form-${campo}-${formulario} i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#form-${campo}-${formulario} i`).classList.add('fa-circle-check');
		document.querySelector(`#form-${campo}-${formulario} .error`).classList.remove('error-activo');
		

	} else {

		document.getElementById(`form-${campo}-${formulario}`).classList.remove('form-formulario-correcto');
		document.getElementById(`form-${campo}-${formulario}`).classList.add('form-formulario-error');
		document.querySelector(`#form-${campo}-${formulario} i`).classList.remove('fa-circle-check');
		document.querySelector(`#form-${campo}-${formulario} i`).classList.add('fa-circle-xmark');
		document.querySelector(`#form-${campo}-${formulario} .error`).classList.add('error-activo');
	}

}


//Fin Funcion

// Funcion valida password 2

const validarPassword2 = () => {
	const password1 = document.getElementById('alumno-password').value;
	const password2 = document.getElementById('alumno-password2').value;

	// Debug, Muestro variables por pantalla.

	// console.log('Contraseña 1:', password1);
	// console.log('Contraseña 2:', password2);

	if (password1 !== password2) {
		document.getElementById('form-password2-alumno').classList.remove('form-formulario-correcto');
		document.getElementById('form-password2-alumno').classList.add('form-formulario-error');
		document.querySelector('#form-password2-alumno i').classList.remove('fa-circle-check');
		document.querySelector('#form-password2-alumno i').classList.add('fa-circle-xmark');
		document.querySelector('#form-password2-alumno .error').classList.add('error-activo');
	} else {
		document.getElementById('form-password2-alumno').classList.remove('form-formulario-error');
		document.getElementById('form-password2-alumno').classList.add('form-formulario-correcto');
		document.querySelector('#form-password2-alumno i').classList.remove('fa-circle-xmark');
		document.querySelector('#form-password2-alumno i').classList.add('fa-circle-check');
		document.querySelector('#form-password2-alumno .error').classList.remove('error-activo');
	}
}

// Fin funcion Password


// Funcion fecha validar los campos llama a la funcion ValidacionCampo
const validarFormulario = (e) => {

    var auxiliar = e.target.name.split("-");

    switch (auxiliar[0]) {
        case "alumno":
            switch (auxiliar[1]) {
                case "firstname":
                    validarCampo(expresiones.nombre, e.target, 'nombre', auxiliar[0]);
                    break;
                case "lastname":
                    validarCampo(expresiones.apellido, e.target, 'apellido', auxiliar[0]);
                    break;
                case "dni":
                    validarCampo(expresiones.dni, e.target, 'dni', auxiliar[0]);
                    break;
                case "password":
                    validarCampo(expresiones.password, e.target, 'password', auxiliar[0]);
                    break;
                case "password2":
                    validarPassword2();
                    break;
            }
            break; 
        case "responsable":
            switch (auxiliar[1]) {
                case "firstname":
                    validarCampo(expresiones.nombre, e.target, 'nombre', auxiliar[0]);
                    break;
                case "lastname":
                    validarCampo(expresiones.nombre, e.target, 'apellido', auxiliar[0]);
                    break;
                case "dni":
                    validarCampo(expresiones.nombre, e.target, 'dni', auxiliar[0]);
                    break;
                case "direccion":
                    validarCampo(expresiones.nombre, e.target, 'direccion', auxiliar[0]);
                    break;
                case "codigopostal":
                    validarCampo(expresiones.nombre, e.target, 'codigopostal', auxiliar[0]);
                    break;
                case "ciudad":
                    validarCampo(expresiones.nombre, e.target, 'ciudad', auxiliar[0]);
                    break;
                case "telefono":
                    validarCampo(expresiones.nombre, e.target, 'telefono', auxiliar[0]);
                    break;
                case "email":
                    validarCampo(expresiones.nombre, e.target, 'email', auxiliar[0]);
                    break;
            }
            break; 
        case "responsable2":
            switch (auxiliar[1]) {
                case "firstname":
                    validarCampo(expresiones.nombre, e.target, 'nombre', auxiliar[0]);
                    break;
                case "lastname":
                    validarCampo(expresiones.nombre, e.target, 'apellido', auxiliar[0]);
                    break;
                case "dni":
                    validarCampo(expresiones.nombre, e.target, 'dni', auxiliar[0]);
                    break;
                case "direccion":
                    validarCampo(expresiones.nombre, e.target, 'direccion', auxiliar[0]);
                    break;
                case "codigopostal":
                    validarCampo(expresiones.nombre, e.target, 'codigopostal', auxiliar[0]);
                    break;
                case "ciudad":
                    validarCampo(expresiones.nombre, e.target, 'ciudad', auxiliar[0]);
                    break;
                case "telefono":
                    validarCampo(expresiones.nombre, e.target, 'telefono', auxiliar[0]);
                    break;
                case "email":
                    validarCampo(expresiones.nombre, e.target, 'email', auxiliar[0]);
                    break;
            }
            break; 
    } 
}; 


document.addEventListener('DOMContentLoaded', function () {
	var boton = document.getElementById('mostrarFormulario');
	var formExtra = document.getElementById('responsable2');
	var inputsAdicional = formExtra.querySelectorAll('input'); // Obtiene todos los input dentro del div

	boton.addEventListener('click', function () {
		// Comprueba si el formulario ya está visible
		if (formExtra.style.display === 'none') {
			formExtra.style.display = 'block';
			boton.textContent = "Ocultar Responsable Adicional"; // Cambiar texto del botón
			// Agregar el atributo required a cada input
			inputsAdicional.forEach(input => {
				input.setAttribute('required', '');
			});
		} else {
			formExtra.style.display = 'none';
			boton.textContent = "Mostrar Responsable Adicional"; // Restaurar texto original del botón
			// Remover el atributo required de cada input
			inputsAdicional.forEach(input => {
				input.removeAttribute('required');
			});
		}
	});
});

//Fin funcion mostrar responsable

// Función generalizada para establecer restricciones de fechas para alumno y responsables 
function setAgeRestrictions(inputId, yearsAgo) {
	var today = new Date();
	var pastDate = new Date(today.getFullYear() - yearsAgo, today.getMonth(), today.getDate());

	var input = document.getElementById(inputId);
	input.max = pastDate.toISOString().split('T')[0];
}

// Función para inicializar las restricciones al cargar la página
function initialize() {
	setAgeRestrictions('alumno-birthday', 3);    // Establece que el alumno debe tener al menos 3 años
	setAgeRestrictions('alumno-birthday', 6);    // Establece que el alumno debe tener máximo 6 años
	setAgeRestrictions('responsable-birthday', 15); // Establece que el responsable debe tener al menos 15 años
	setAgeRestrictions('responsable2-birthday', 15); // Establece que el responsable debe tener al menos 15 años
}

// Agregar evento de carga a la ventana para ejecutar la función initialize al cargar la página
window.addEventListener('load', initialize);

// Finaliza funcion control calendario.



inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario); // cada vez que se presiona una tecla ejecuta el codigo
	input.addEventListener('blur', validarFormulario); // blur cuando le damos click fuera del input se ejecuta.
});

// Con esto cuando realizamos el submit no cambia la url. es para la demostración
// formulario.addEventListener('submit', (e) => {
// 	e.preventDefault();
// });
