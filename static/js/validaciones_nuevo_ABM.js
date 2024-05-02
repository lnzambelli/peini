// defino el formulario de para ralizar las comparativas 

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

// defino las expreciones regurlares para controlar los inputs
const expresiones = {
	nombre: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	dni: /^.{6,14}$/, // 4 a 12 digitos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

}

const campos = {
	nombre: false,
	apellido: false,
	dni: false,
	password: false,
	email: false,

}

// función tipo flecha de validacion

const validarCampo = (expresion, input, campo) => {
	//se llama a la funcion test y devuelve un booleano comparando con la expresion que definimos
	if (expresion.test(input.value)) {

		document.getElementById(`form-${campo}`).classList.remove('form-formulario-error');
		document.getElementById(`form-${campo}`).classList.add('form-formulario-correcto');
		document.querySelector(`#form-${campo} i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#form-${campo} i`).classList.add('fa-circle-check');
		document.querySelector(`#form-${campo} .error`).classList.remove('error-activo');

	} else {
		document.getElementById(`form-${campo}`).classList.remove('form-formulario-correcto');
		document.getElementById(`form-${campo}`).classList.add('form-formulario-error');
		document.querySelector(`#form-${campo} i`).classList.remove('fa-circle-check');
		document.querySelector(`#form-${campo} i`).classList.add('fa-circle-xmark');
		document.querySelector(`#form-${campo} .error`).classList.add('error-activo');
	}

}

//Fin Funcion

// Funcion valida password 2

const validarPassword2 = () => {
    const password1 = document.getElementById('usuario-password').value;
    const password2 = document.getElementById('usuario-password2').value;

	// Debug, Muestro variables por pantalla.

	// console.log('Contraseña 1:', password1);
    // console.log('Contraseña 2:', password2);

    if (password1 !== password2) {
        document.getElementById('form-password2').classList.remove('form-formulario-correcto');
        document.getElementById('form-password2').classList.add('form-formulario-error');
        document.querySelector('#form-password2 i').classList.remove('fa-circle-check');
        document.querySelector('#form-password2 i').classList.add('fa-circle-xmark');
        document.querySelector('#form-password2 .error').classList.add('error-activo');
    } else {
		document.getElementById('form-password2').classList.remove('form-formulario-error');
        document.getElementById('form-password2').classList.add('form-formulario-correcto');
		document.querySelector('#form-password2 i').classList.remove('fa-circle-xmark');
        document.querySelector('#form-password2 i').classList.add('fa-circle-check');
        document.querySelector('#form-password2 .error').classList.remove('error-activo');
	}
}

// Fin funcion Password


// Funcion fecha validar los campos llama a la funcion ValidacionCampo
const validarFormulario = (e) => {
	// console.log("Funciona la funcion"); 

	// caputor los nombres de los los inputs
	// console.log(e.target.name);
	switch (e.target.name) {

		case "usuario-firstname":
			validarCampo(expresiones.nombre, e.target, 'nombre');

			break;

		case "usuario-lastname":
			validarCampo(expresiones.apellido, e.target, 'apellido');

			break;

		case "usuario-dni":
			validarCampo(expresiones.dni, e.target, 'dni');

			break;

		case "usuario-email":
			validarCampo(expresiones.mail, e.target, 'email');

			break;

		case "usuario-password":
			validarCampo(expresiones.password, e.target, 'password');
			break;


		case "usuario-password2":
			validarPassword2();

			break;

	}

}

// Fin Funcion Validación Campo


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario); // cada vez que se presiona una tecla ejecuta el codigo
	input.addEventListener('blur', validarFormulario); // blur cuando le damos click fuera del input se ejecuta.
});

// Con esto cuando realizamos el submit no cambia la url. es para la demostración
formulario.addEventListener('submit', (e) => {
	e.preventDefault();
});