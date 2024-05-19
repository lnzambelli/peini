let miHeader=`
    <a href="./index.html">
        <img src="./static/img/favicon.ico" id="logo" alt="PEINI">
      </a>
      <a href="#" id="hamburger-icon" class="hamburger-icon">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </a>

      <nav id="nav-menu">
        <!--Menu-->
        <div>
  
          <!--Menu de navegación-->
          <ul>
  
            <li><a class="btn btn-secundario btnNav" href="#banner"> Inicio </a></li>
  
            <li><a class="btn btn-secundario btnNav" href="./templates/plataforma.html"> Plataforma Educativa </a></li>
  
            <li><a class="btn btn-secundario btnNav" href="#somos-PEINI"> Somos PEINI </a></li>
  
            <li><a class="btn btn-secundario btnNav" href="./templates/contact.html"> Contactos </a></li>
  
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