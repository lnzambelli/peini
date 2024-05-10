// Defino el formulario de para ralizar las comparativas, defino variables globales. //

const formulario = document.getElementById('formulario-registro');
const inputs = document.querySelectorAll('#formulario-registro input');
const campos = {}; // Crebjeto para almacenar las variables booleanas
// Fin variableas globales


// Defino las expreciones regulares para controlar los inputs //
const expresiones = {
	nombre: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	apellido: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, // Letras y espacios, pueden llevar acentos.
	direccion: /^[a-zA-Z0-9\_\-]{4,16}$/, // Esta expresión regular garantizará que haya al menos dos letras y dos dígitos en la cadena, contando los espacios, y que la longitud total de la cadena no supere los 20 caracteres.
	codigopostal: /^.{4,10}$/, // 4 a 10 digitos.
	ciudad: /^[a-zA-Z0-9]{4,20}$/, // 4 a 20 digitos.
	dni: /^.{6,14}$/, // 6 a 14 digitos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^.{8,12}$/, // 8 a 12 digitos.
}
//Fin expresiones regulares

// Funcion creo variables para validación. //
function crearVariables() {
	// Obtener todos los campos de entrada dentro del formulario
	var camposNombre = formulario.getElementsByTagName("input");

	// Recorrer todos los inputs
	for (var i = 0; i < camposNombre.length; i++) {
		var nombreCampo = camposNombre[i].name;
		// Crear la variable booleana y asignar el valor false
		campos[nombreCampo] = false;

	}

	// Muestro por consola
	Object.keys(campos).forEach(key => {
		console.log(`Clave: ${key}, Valor: ${campos[key]}`);
	});
}
// FIn funcion creo variables.


// funcion para comparar los true y false de todos los inputs //
function control(obj, control2) {
	console.log(control2);
	if (control2 === "none") {
		console.log("entra none");
		for (let key in obj) {
			if (!key.startsWith("responsable2")) {
				if (obj[key] !== true) {
					return false;
				}
			}
		}
	}
	else if (control2 === "block") {
		console.log("entra Block");
		for (let key in obj) {
			if (obj[key] !== true) {
				return false;
			}
		}
	}
	return true;
}
//Fin Funcion de Comparar

// Funcion Verifico sala //
function verificarSalaSeleccionada() {
	var radios = document.getElementsByName('alumno-sala');

	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			campos["alumno-sala"] = true;
			break;
		}
	}

	if (!campos["alumno-sala"]) {
		alert('Por favor, seleccione una sala.');
		campos["alumno-sala"] = false;
	}
}
// Fin Funcion Sala


// Funciones validacion Feha de nacimiento y upload configuro el campo en booleano //
document.addEventListener("DOMContentLoaded", function () {
	// Tomos los elementos de fecha
	var validoAlumnobirthday = document.getElementById("alumno-birthday");
	var validoResponsablebirthday = document.getElementById("responsable-birthday");
	var validoResponsable2birthday = document.getElementById("responsable2-birthday");
	var validoArchivoupload = document.getElementById("archivo-upload");

	// Lee los eventos y varifica que el elemento tenga cambios.
	validoAlumnobirthday.addEventListener("change", function () {
		// si no esta vacio completa el campo en true
		if (this.value !== "") {
			console.log("Date selected:", this.value);
			campos["alumno-birthday"] = true;
		}
	});

	validoResponsablebirthday.addEventListener("change", function () {
		// Lee los eventos y varifica que el elemento tenga cambios.
		if (this.value !== "") {
			console.log("Date selected:", this.value);
			campos["responsable-birthday"] = true;
		}
	});

	validoResponsable2birthday.addEventListener("change", function () {
		// Lee los eventos y varifica que el elemento tenga cambios.
		if (this.value !== "") {
			console.log("Date selected:", this.value);
			campos["responsable2-birthday"] = true;
		}
	});

	// Lee los eventos y varifica que el elemento tenga cambios.
	validoArchivoupload.addEventListener("change", function () {
		// si no esta vacio completa el campo en true
		if (this.value !== "") {
			campos["archivo-upload"] = true;
		}
	});

});
// Fin Fecha y upload

// Funcion Verifico Turno //
function verificarTurnoSeleccionado() {
	var radios = document.getElementsByName('alumno-turno');

	for (var i = 0; i < radios.length; i++) {
		if (radios[i].checked) {
			campos["alumno-turno"] = true;
			break;
		}
	}

	if (!campos["alumno-turno"]) {
		alert('Por favor, seleccione un turno.');
		campos["alumno-turno"] = false;
	}
}
// Fin Funcion Turno


// función Valido campos tipo Flecha //
const validarCampo = (expresion, input, campo, formulario) => {

	// debugger;
	//se llama a la funcion test y devuelve un booleano comparando con la expresion que definimos
	if (expresion.test(input.value)) {

		document.getElementById(`form-${campo}-${formulario}`).classList.remove('form-formulario-error');
		document.getElementById(`form-${campo}-${formulario}`).classList.add('form-formulario-correcto');
		document.querySelector(`#form-${campo}-${formulario} i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#form-${campo}-${formulario} i`).classList.add('fa-circle-check');
		document.querySelector(`#form-${campo}-${formulario} .error`).classList.remove('error-activo');
		campos[`${formulario}-${campo}`] = true;

	} else {

		document.getElementById(`form-${campo}-${formulario}`).classList.remove('form-formulario-correcto');
		document.getElementById(`form-${campo}-${formulario}`).classList.add('form-formulario-error');
		document.querySelector(`#form-${campo}-${formulario} i`).classList.remove('fa-circle-check');
		document.querySelector(`#form-${campo}-${formulario} i`).classList.add('fa-circle-xmark');
		document.querySelector(`#form-${campo}-${formulario} .error`).classList.add('error-activo');
		campos[`${formulario}-${campo}`] = false;
	}

}
//Fin Funcion

// Funcion valida password 2 //
const validarPassword2 = () => {
	var password1 = document.getElementById('alumno-password').value;
	var password2 = document.getElementById('alumno-password2').value;

	// Debug, Muestro variables por pantalla.

	// console.log('Contraseña 1:', password1);
	// console.log('Contraseña 2:', password2);

	if (password1 !== password2 || !expresiones.password.test(password1)) {
		document.getElementById('form-password2-alumno').classList.remove('form-formulario-correcto');
		document.getElementById('form-password2-alumno').classList.add('form-formulario-error');
		document.querySelector('#form-password2-alumno i').classList.remove('fa-circle-check');
		document.querySelector('#form-password2-alumno i').classList.add('fa-circle-xmark');
		document.querySelector('#form-password2-alumno .error').classList.add('error-activo');
		campos["alumno-password"] = false;
		campos["alumno-password2"] = false;
	} else {
		document.getElementById('form-password2-alumno').classList.remove('form-formulario-error');
		document.getElementById('form-password2-alumno').classList.add('form-formulario-correcto');
		document.querySelector('#form-password2-alumno i').classList.remove('fa-circle-xmark');
		document.querySelector('#form-password2-alumno i').classList.add('fa-circle-check');
		document.querySelector('#form-password2-alumno .error').classList.remove('error-activo');
		campos["alumno-password"] = true;
		campos["alumno-password2"] = true;
	}
}
// Fin funcion Password


// Funcion flecha validar los campos llama a la funcion ValidacionCampo //
const validarFormulario = (e) => {

	var auxiliar = e.target.name.split("-");

	switch (auxiliar[0]) {
		case "alumno":
			switch (auxiliar[1]) {
				case "nombre":
					validarCampo(expresiones.nombre, e.target, 'nombre', auxiliar[0]);
					break;
				case "apellido":
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
				case "nombre":
					validarCampo(expresiones.nombre, e.target, 'nombre', auxiliar[0]);
					break;
				case "apellido":
					validarCampo(expresiones.apellido, e.target, 'apellido', auxiliar[0]);
					break;
				case "dni":
					validarCampo(expresiones.dni, e.target, 'dni', auxiliar[0]);
					break;
				case "direccion":
					validarCampo(expresiones.direccion, e.target, 'direccion', auxiliar[0]);
					break;
				case "codigopostal":
					validarCampo(expresiones.codigopostal, e.target, 'codigopostal', auxiliar[0]);
					break;
				case "ciudad":
					validarCampo(expresiones.ciudad, e.target, 'ciudad', auxiliar[0]);
					break;
				case "telefono":
					validarCampo(expresiones.telefono, e.target, 'telefono', auxiliar[0]);
					break;
				case "email":
					validarCampo(expresiones.mail, e.target, 'email', auxiliar[0]);
					break;
			}
			break;
		case "responsable2":
			switch (auxiliar[1]) {
				case "nombre":
					validarCampo(expresiones.nombre, e.target, 'nombre', auxiliar[0]);
					break;
				case "apellido":
					validarCampo(expresiones.apellido, e.target, 'apellido', auxiliar[0]);
					break;
				case "dni":
					validarCampo(expresiones.dni, e.target, 'dni', auxiliar[0]);
					break;
				case "direccion":
					validarCampo(expresiones.direccion, e.target, 'direccion', auxiliar[0]);
					break;
				case "codigopostal":
					validarCampo(expresiones.codigopostal, e.target, 'codigopostal', auxiliar[0]);
					break;
				case "ciudad":
					validarCampo(expresiones.ciudad, e.target, 'ciudad', auxiliar[0]);
					break;
				case "telefono":
					validarCampo(expresiones.telefono, e.target, 'telefono', auxiliar[0]);
					break;
				case "email":
					validarCampo(expresiones.mail, e.target, 'email', auxiliar[0]);
					break;
			}
			break;
	}
};
// Fin Validacion campo

// Funcion muestro nuevo responsable //
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

// Función restricciones de fechas para alumno y responsables //
function setAgeRestrictions(inputId, yearsAgo) {
	var today = new Date();
	var pastDate = new Date(today.getFullYear() - yearsAgo, today.getMonth(), today.getDate());

	var input = document.getElementById(inputId);
	input.max = pastDate.toISOString().split('T')[0];
}
// Fin fucncion resticciones

// Función para setear minimos y maximos //
function initialize() {
	setAgeRestrictions('alumno-birthday', 3);    // Establece que el alumno debe tener al menos 3 años
	setAgeRestrictions('alumno-birthday', 6);    // Establece que el alumno debe tener máximo 6 años
	setAgeRestrictions('responsable-birthday', 15); // Establece que el responsable debe tener al menos 15 años
	setAgeRestrictions('responsable2-birthday', 15); // Establece que el responsable debe tener al menos 15 años
}
// Finaliza funcion control calendario.

// Función check formulario //
const check_inputs = (e) => {
	e.preventDefault();

	// Eejcuto Funciones de Verificar sala y turno
	verificarSalaSeleccionada();
	verificarTurnoSeleccionado();
	// Fin 

	console.log(control(campos))
	// Lllamo a la funcion Control y le paso el objeto campos y la salida del display del responsable 2
	if (control(campos, document.getElementById('responsable2').style.display)) {


		// agrego clases al mesaje correcto
		document.getElementById('form-mensaje-valido').classList.add('form-mensaje-valido-activo');
		document.getElementById('form-valido-campo').classList.add('form-valido-campo-exito');
		var mensajeExito = document.querySelector('.form-mensaje-exito');
		mensajeExito.innerText = 'Formulario enviado exitosamente!';
		mensajeExito.style.color = 'green';

		// Funcion para que el mensaje quede 5 segundos
		setTimeout(() => {
			document.getElementById('form-mensaje-exito').classList.remove('form-mensaje-exito-activo');
			document.getElementById('form-valido-campo').classList.remove('form-valido-campo-exito');
		}, 3000); // queda 3 segundos el mensaje



		// Reset del formulario si termina exitoso.
		document.getElementById("form-registro").reset();

		// Borra la clase de formulario correcto para volver a la case inicial.
		document.querySelectorAll('.validacion-reset').forEach((elemento) => {
			elemento.classList.remove('form-formulario-correcto');
		});
		// reinicia los campos los pone en false.
		crearVariables()


	} else {
		document.getElementById('form-mensaje-valido').classList.add('form-mensaje-valido-activo');
		document.getElementById('form-valido-campo').classList.add('form-valido-campo-error');
		var mensajeExito = document.querySelector('.form-mensaje-valido');
		mensajeExito.innerText = 'Completar formulario correctamente';
		mensajeExito.style.color = 'red';
		setTimeout(() => {
			document.getElementById('form-mensaje-valido').classList.remove('form-mensaje-valido-activo');
			document.getElementById('form-valido-campo').classList.remove('form-valido-campo-error');
		}, 3000); // queda 3 segundos el mensaje.
	}
};
// fin check fromulario

// Se ejecutan las validaciones //

// Ejecutar las funciónes "initialize" y "crearVariables" solo en la página "registro.html"
document.addEventListener("DOMContentLoaded", function () {
	// Obtener la URL de la página actual
	var url = window.location.href;
	// Verificar si la URL contiene "registro.html"
	if (url.indexOf("register.html") !== -1) {
		// Si la URL coincide, ejecutar la función
		initialize();
		crearVariables();
	}
});
//Fin ejecuta la funcion.



// ejecuto la funcion validar formulario cada vez que hacemos click o escribimos.//
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario); // cada vez que se presiona una tecla ejecuta el codigo
	input.addEventListener('blur', validarFormulario); // blur cuando le damos click fuera del input se ejecuta.
});

// Fin ejecuto la funcion.