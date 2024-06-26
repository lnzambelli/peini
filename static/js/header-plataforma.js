let miHeader=`
<!--Logo-->
<a href="./plataforma.html">
  <img src="../static/img/favicon.ico" id="logo" alt="PEINI">
</a>
<a href="#" id="hamburger-icon" class="hamburger-icon">
  <div class="bar"></div>
  <div class="bar"></div>
  <div class="bar"></div>
</a>

<nav id="nav-menu">
  <!--Menu-->
  <div>

    <!--Menu de navegacion-->
    <ul>

      <li><a class="btn btn-secundario btnNav" href="../templates/games.html">Juegos </a></li>

      <li><a class="btn btn-secundario btnNav" href="../templates/library.html"> Biblioteca </a></li>

      <li><a class="btn btn-secundario btnNav" href="../templates/gestion_usuario.html"> Gestión de usuarios </a></li>

      <li><a class="btn btn-secundario btnNav" href="../templates/register.html"> Registro de alumnos </a></li>

      <li><a class="btn btn-secundario btnNav" href="../templates/contact.html"> Contactos </a></li>

      <li><a class="btn btn-secundario btnNav" href="../index.html"> Salir </a></li>


    </ul>


</nav>
</div>
`

document.querySelector(".myHeader").innerHTML=miHeader;

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const navMenu = document.getElementById('nav-menu');

  hamburgerIcon.addEventListener('click', (e) => {
    e.preventDefault();
    navMenu.classList.toggle('show');
  });
});