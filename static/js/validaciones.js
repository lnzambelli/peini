// Función para limitar la selección a una sola sala
function limitarSeleccion(checkbox) {
    var checkboxes = document.getElementsByName("Nivel");
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    checkbox.checked = true;
}

// Función para validar campos de entrada
function validarCampo(inputId, errorId, pattern) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);

    if (!pattern.test(input.value)) {
        error.style.display = "block";
    } else {
        error.style.display = "none";
    }
}