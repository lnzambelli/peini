let miHeader=`
    <a href="">
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
  
          <!--Menu de navegacion-->
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
