'use strict';

/*
TODO: BUG
Am Handy und iPad funktioniert es nicht bzw. nicht gut:
u.a.
* Anwendung von header-transparent
* (dadurch beding) weißer Streifen zwischen header und titleImg
* Berechnung der Headerhöhe (manchmal wird sie nicht berücksichtigt und der eigentliche Seiteninhalt wird hinter dem Header angezeigt)
* Berechnung der Höhe des titleImg
Unterschiedliches Verhalten je nachdem ob Hoch- oder Querformat und es funktioniert auch nicht immer gleich. Woran auch immer das liegt...
Vielleicht sollte ich die Höhe des Headers doch fest setzen?
Vielleicht sollte ich doch window.innerHeight probieren?
Sollte die Seite bei Änderung der Rotation neu laden?
*/

/* ----- variables (before init) ----- */

const header = document.querySelector(`.header`);
const footer = document.querySelector(`.footer`);
const h1 = document.querySelector(`h1`);
const index = document.querySelector(`.index`);

/* ----- init: load header and footer ----- */

const init = function () {
  header.insertAdjacentHTML(
    `beforeend`,
    /*HTML*/
    `<div class="header-logo">
      <a href="./index.html">
        <img src="./img/favicon.png" alt="logo" class="logo">
        Essential Yoga
      </a>
    </div>`
  );
  if (index) {
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

const headerHeight = header.getBoundingClientRect().height;

/* ----- dynamic styles ----- */

const dynamicStyles = function () {
  if (index) {
    const titleImg = document.querySelector(`.title-img`);

    titleImg.style.height = `${document.documentElement.clientHeight * 0.75}px`; // height of title image depending on viewport
    titleImg.style.marginTop = `${headerHeight}px`; // add space for sticky header
  } else {
    const main = document.querySelector(`main`);

    main.style.marginTop = `${headerHeight}px`; // add space for sticky header
  }
};

dynamicStyles();

/* ----- mobile menu ----- */

if (index) {
  const menuIcon = document.querySelector(`.menu-icon`);
  const menuIconBar1 = document.querySelector(`.menu-icon-bar1`);
  const menuIconBar2 = document.querySelector(`.menu-icon-bar2`);
  const menuIconBar3 = document.querySelector(`.menu-icon-bar3`);
  const headerNav = document.querySelector(`.header-nav`);

  menuIcon.addEventListener(`click`, function () {
    menuIcon.classList.toggle(`menu-icon--open`);
    menuIconBar1.classList.toggle(`menu-icon-bar1-x`);
    menuIconBar2.classList.toggle(`menu-icon-bar2-x`);
    menuIconBar3.classList.toggle(`menu-icon-bar3-x`);
    headerNav.classList.toggle(`header-nav--closed`);
    headerNav.classList.toggle(`header-nav--open`);
  });
}

// TODO header-nav--closed, header-nav--open: Vielleicht kann ich mir eine der beiden Klassen (header-nav--closed) sparen, indem ich den style einfach per default setze. Für Desktop überschreibe ich es dann ja eh.

// TODO close mobile menu when link is clicked --> within smooth scrolling or if that's not possible in a seperate function

/* ----- make nav transparent and smaller when scrolling down (when h1 intersects with header) ----- */

const headerTransparent = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) header.classList.remove(`header--transparent`);
    else header.classList.add(`header--transparent`);
  });
};

const h1Observer = new IntersectionObserver(headerTransparent, {
  root: null,
  threshold: 0.75,
  rootMargin: `-${headerHeight}px`,
});

h1Observer.observe(h1);
