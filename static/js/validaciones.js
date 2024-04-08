// Función para limitar la selección a una sola sala
function limitarSeleccion(checkbox) {
    // Captura los elementos de tipo checkbox con el nombre "Nivel"
    var checkboxes = document.getElementsByName("Nivel");
    // Desmarcar todos los checkboxes
    for (var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].checked = false;
    }
    // Marcar el checkbox seleccionado
    checkbox.checked = true;
}

// Función para validar campos de entrada
function validarCampo(inputId, errorId, pattern) {
    // Obtener el elemento de entrada y el elemento de error por sus ID
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
 // Verificar si el input coincide con el patrón especificado
    if (!pattern.test(input.value)) {
        // Si es diferete muestra el mensaje de error
        error.style.display = "block";
    } else {
        // Si coincide oculta el mensaje de error.
        error.style.display = "none";
    }
}