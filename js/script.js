'use strict';

/* ----- variables (before init) ----- */

const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);

/* ----- load header and footer ----- */

const init = function () {
  header.insertAdjacentHTML(
    `beforeend`,
    /*HTML*/
    `<div class="header-logo">
        <a href="./index.html">Essential Yoga</a>
        <!-- https://tabler.io/icons/icon/plant-2 -->
        <!-- <img src="" alt=""> -->
    </div>`
  );
  if (document.querySelector(`main`).classList.contains(`index`)) {
    header.insertAdjacentHTML(
      `beforeend`,
      /*HTML*/
      `<div class="header-nav-container">
        <div class="menu-icon">
          <div> <!-- necessary to align menu icon to the right -->
            <div class="menu-icon-bar1"></div>
            <div class="menu-icon-bar2"></div>
            <div class="menu-icon-bar3"></div>   
          </div>
        </div>
        <nav class="header-nav header-nav--closed">
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
        </nav>
      </div>`
    );
  }
  footer.insertAdjacentHTML(
    `beforeend`,
    /*HTML*/
    `<div>
      Hierbei handelt es sich um eine Demo-Website.
    </div>
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

/* ----- variables (after init) ----- */

const btnLearnMore = document.querySelector(`.btn__learn-more`);
const titleImg = document.querySelector(`.title-img`);

const menuIcon = document.querySelector(`.menu-icon`);
const menuIconBar1 = document.querySelector(`.menu-icon-bar1`);
const menuIconBar2 = document.querySelector(`.menu-icon-bar2`);
const menuIconBar3 = document.querySelector(`.menu-icon-bar3`);
const headerNav = document.querySelector(`.header-nav`);

/* ----- title image height ----- */

titleImg.style.height = `${window.innerHeight * 0.75}px`;

/* ----- mobile menu ----- */

menuIcon.addEventListener(`click`, function () {
  menuIcon.classList.toggle(`menu-icon--open`);
  menuIconBar1.classList.toggle(`menu-icon-bar1-x`);
  menuIconBar2.classList.toggle(`menu-icon-bar2-x`);
  menuIconBar3.classList.toggle(`menu-icon-bar3-x`);
  headerNav.classList.toggle(`header-nav--closed`);
  headerNav.classList.toggle(`header-nav--open`);
});

// TODO close mobile menu when link is clicked --> within smooth scrolling or if that's not possible in a seperate function
