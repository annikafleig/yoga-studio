'use strict';

/* ----- variables ----- */

const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);

/* ----- load header and footer ----- */

const init = function () {
  header.insertAdjacentHTML(
    `beforeend`,
    `<div class="header-logo">
        <a href="./index.html">LOGO</a>
        <!-- https://tabler.io/icons/icon/plant-2 -->
        <!-- <img src="" alt=""> -->
    </div>`
  );
  if (document.querySelector(`main`).classList.contains(`index`)) {
    header.insertAdjacentHTML(
      `beforeend`,
      `<div class="menu-icon">
        <div>
          <div class="menu-icon-bar1"></div>
          <div class="menu-icon-bar2"></div>
          <div class="menu-icon-bar3"></div>
        </div>      
      </div>
      <nav class="header-nav">
          <ul class="header-nav__links">
            <li class="header-nav__item">
              <a class="header-nav__link" href="#section-1">Mehr erfahren</a>
            </li>
            <li class="header-nav__item">
              <a class="header-nav__link" href="#section-2">Angebote</a>
            </li>
            <li class="header-nav__item">
              <a class="header-nav__link" href="#section-3">Rezensionen</a>
            </li>
            <li class="header-nav__item">
              <a class="header-nav__link" href="#section-4">Kontakt</a>
            </li>
          </ul>
        </nav>`
    );
  }
  footer.insertAdjacentHTML(
    `beforeend`,
    `<div>Hierbei handelt es sich um eine Demo-Website.</div>
      <nav class="footer-nav">
        <ul class="footer-nav__links">
          <li class="footer-nav__item">
            <a class="footer-nav__link" href="./datenschutz.html">Datenschutz</a>
          </li>
          <li class="footer-nav__item">
            <a class="footer-nav__link" href="./impressum.html">Impressum</a>
          </li>
        </ul>
      </nav>`
  );
};
init();

/*

function viewForm(){
  if (window.innerWidth > 1440) {
    document.getElementById("form").style.display = "block";
  } else {
    document.getElementById("form").style.display = "none";
  }
};

window.addEventListener('resize', viewForm);

*/
