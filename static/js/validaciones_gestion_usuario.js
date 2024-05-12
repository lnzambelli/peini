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
	email: false

}

// Funcion para reiniciar los campos en false
function reiniciarCampos() {
    for (let campo in campos) {
        campos[campo] = false;
    }
}

//fin funcion

// función tipo flecha de validacion

const validarCampo = (expresion, input, campo) => {
	//se llama a la funcion test y devuelve un booleano comparando con la expresion que definimos
	if (expresion.test(input.value)) {

		document.getElementById(`form-${campo}`).classList.remove('form-formulario-error');
		document.getElementById(`form-${campo}`).classList.add('form-formulario-correcto');
		document.querySelector(`#form-${campo} i`).classList.remove('fa-circle-xmark');
		document.querySelector(`#form-${campo} i`).classList.add('fa-circle-check');
		document.querySelector(`#form-${campo} .error`).classList.remove('error-activo');
		campos[campo] = true;

	} else {
		document.getElementById(`form-${campo}`).classList.remove('form-formulario-correcto');
		document.getElementById(`form-${campo}`).classList.add('form-formulario-error');
		document.querySelector(`#form-${campo} i`).classList.remove('fa-circle-check');
		document.querySelector(`#form-${campo} i`).classList.add('fa-circle-xmark');
		document.querySelector(`#form-${campo} .error`).classList.add('error-activo');
		campos[campo] = false;
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

	if (password1 !== password2 || !expresiones.password.test(password1)) {
		document.getElementById('form-password2').classList.remove('form-formulario-correcto');
		document.getElementById('form-password2').classList.add('form-formulario-error');
		document.querySelector('#form-password2 i').classList.remove('fa-circle-check');
		document.querySelector('#form-password2 i').classList.add('fa-circle-xmark');
		document.querySelector('#form-password2 .error').classList.add('error-activo');
		campos['password'] = false;
	} else {
		document.getElementById('form-password2').classList.remove('form-formulario-error');
		document.getElementById('form-password2').classList.add('form-formulario-correcto');
		document.querySelector('#form-password2 i').classList.remove('fa-circle-xmark');
		document.querySelector('#form-password2 i').classList.add('fa-circle-check');
		document.querySelector('#form-password2 .error').classList.remove('error-activo');
		campos['password'] = true;
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
			validarPassword2();
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

// cheque formulario 

const check_inputs = (e) => {
	e.preventDefault();

	if (campos.nombre && campos.apellido && campos.dni && campos.password && campos.email ) {
		// formulario.reset();
		console.log("Funciona la función");
		
		// agrego clases al mesaje correcto
		document.getElementById('form-mensaje-valido').classList.add('form-mensaje-valido-activo');
		document.getElementById('form-valido-campo').classList.add('form-valido-campo-exito');
		var mensajeExito = document.querySelector('.form-mensaje-valido');
		mensajeExito.innerText = 'Formulario enviado exitosamente!';
		mensajeExito.style.color = '#94be1f';

		// Funcion para que el mensaje quede 5 segundos
		setTimeout(() => {
			document.getElementById('form-mensaje-valido').classList.remove('form-mensaje-valido-activo');
			document.getElementById('form-valido-campo').classList.remove('form-valido-campo-exito');
		}, 3000); // queda 3 segundos el mensaje

		// Reset del formulario si termina exitoso.
		document.getElementById("formulario-usuario").reset();
		
		// Borra la clase de formulario correcto para volver a la case inicial.
		document.querySelectorAll('.form-formulario').forEach((elemento) => {
			elemento.classList.remove('form-formulario-correcto');
		});
		// reinicia los campos los pone en false.
		reiniciarCampos();


	} else {
		document.getElementById('form-mensaje-valido').classList.add('form-mensaje-valido-activo');
		document.getElementById('form-valido-campo').classList.add('form-valido-campo-error');
		var mensajeExito = document.querySelector('.form-mensaje-valido');
		mensajeExito.innerText = 'Completar formulario correctamente';
		mensajeExito.style.color = '#dc3545';
		setTimeout(() => {
			document.getElementById('form-mensaje-valido').classList.remove('form-mensaje-valido-activo');
			document.getElementById('form-valido-campo').classList.remove('form-valido-campo-error');
		}, 3000); // queda 3 segundos el mensaje.
	}
};

// fin cheque coampo