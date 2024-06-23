// Sample data
const data = [
    { avatar: '../static/img/mateo.jpg', nombre: 'Juan', apellido: 'Perez', dni: '12345678', email: 'prueba@mail.com', perfil: 'Admin', password: 'abc'},
    { avatar: '../static/img/mateo.jpg', nombre: 'Ana', apellido: 'Garcia', dni: '87654321', email: 'prueba@mail.com', perfil: 'Admin', password: 'abc'},
  ];

  // Function to create a table row
  function createRow(person) {
    const tr = document.createElement('tr');
  
    tr.innerHTML = `
      <td><img src="${person.avatar}" alt="Avatar" class="avatar"></td>
      <td>${person.nombre} ${person.apellido}</td>
      <td>${person.dni}</td>
      <td>${person.email}</td>
      <td>${person.perfil}</td>
      <td>
        <i class="fas fa-edit actions" onclick="openEditForm('${person.dni}')"></i>
        <i class="fas fa-trash actions" onclick="deleteRow(this)"></i>
      </td>
    `;
  
    return tr;
  }
  
  // Function to render the table
  function renderTable(data) {
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = ''; // Clear existing rows
    data.forEach(person => {
      tbody.appendChild(createRow(person));
    });
  }
  
  // Search functionality
  document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredData = data.filter(person =>
      person.nombre.toLowerCase().includes(searchTerm) || person.apellido.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredData);
  });
  
  // Open the modal
const modal = document.getElementById('myModal');
const span = document.getElementsByClassName('close')[0];
const formTitle = document.getElementById('formTitle');
const userForm = document.getElementsByClassName('userForm');

span.onclick = function() {
  closeForm();
}

window.onclick = function(event) {
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
  const person = data.find(p => p.dni === dni);
  if (person) {
    formTitle.textContent = '';
    document.getElementById('usuario-archivo').src = person.avatar;
    document.getElementById('usuario-firstname').value = person.nombre;
    document.getElementById('usuario-lastname').value = person.apellido;
    document.getElementById('usuario-dni').value = person.dni;
    document.getElementById('usuario-email').value = person.email;
    document.getElementById('usuario-perfil').value = person.perfil;
    document.getElementById('usuario-password').value = person.password
    document.getElementById('usuario-password2').value = person.password
    editingPerson = person;
    modal.style.display = 'block';
  }
}

function closeForm() {
  modal.style.display = 'none';
}

// Submit form
function submitForm() {

  const avatar = document.getElementById('usuario-archivo').value 
  const nombre = document.getElementById('usuario-firstname').value
  const apellido =  document.getElementById('usuario-lastname').value 
  const dni = document.getElementById('usuario-dni').value 
  const password = document.getElementById('usuario-password').value
  const password2 = document.getElementById('usuario-password2').value 
  const email =  document.getElementById('usuario-email').value 
  const perfil =  document.getElementById('usuario-perfil').value 

  //ACCION PARA ACTUALIZAR DATOS
  
  renderTable(data);
  closeForm();
}

// Delete row function
function deleteRow(element) {
  if (confirm('Are you sure you want to delete this row?')) {
    const row = element.closest('tr');
    const nombre = row.cells[1].textContent;
    // Remove from data array
    const index = data.findIndex(person => person.nombre === nombre);
    if (index > -1) {
      data.splice(index, 1);
    }
    row.remove();
  }
}

// Initial render
renderTable(data);
