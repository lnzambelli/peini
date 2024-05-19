let miFooter=`
<!--Contenedor logo y descripcion-->
<div class="footer-container">

  <img src="./static/img/icono.png" class="img-peini" alt="Logo">
  <h1>PEINI</h1>
  <h4>Plataforma Educativa Interactiva de Nivel Inicial</h4>

</div>

</div>

<!--Contenedor contactos-->
<div class="footer-container">

  <h4>Contactos</h4>

  <p><strong>Dirección: </strong>P. Sherman Calle Wallaby 42, Sidney</p>
  <br>
  <p><strong>Teléfono: </strong>(+5411) 4235-0001</p>
  <br>
  <p><strong>Consultas: </strong><a href="./templates/contact.html">Clic aquí</a></p>

  <!--Contenedor redes sociales-->
  <div class="">

    <a href="https://www.facebook.com/peini.peini.3" target="_blank">
      <img src="./static/img/facebook.png" alt="Facebook" width="25">
    </a>

    <a href="https://www.instagram.com/peini.peini.3/" target="_blank">
      <img src="./static/img/instagram.png" alt="Instagram" width="25">
    </a>

  </div>

</div>

<div class="footer-container footer-map">

  <!--mapa-->

  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13137.662945596958!2d-58.4041978046596!3d-34.59364744170856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a3354c0f3c471f%3A0xf04921b32eb169a8!2sEdificio%20Libertad%2C%20Av.%20Comodoro%20Py%202055%2C%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1712671261504!5m2!1ses-419!2sar"
    width="300" height="250" style="border:0;" allowfullscreen="" loading="lazy"
    referrerpolicy="no-referrer-when-downgrade">

  </iframe>

</div>
`

document.querySelector(".footer").innerHTML=miFooter;