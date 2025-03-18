'use strict';

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
        <nav class="header-nav">
          <ul class="header-nav__links">
            <li class="header-nav__item">
              <a class="header-nav__link" href="#section-1" data-name="section-1">Mehr erfahren</a>
            </li>
            <li class="header-nav__item">
              <a class="header-nav__link" href="#section-2" data-name="section-2">Angebote</a>
            </li>
            <li class="header-nav__item">
              <a class="header-nav__link" href="#section-3" data-name="section-3">Rezensionen</a>
            </li>
            <li class="header-nav__item">
              <a class="header-nav__link" href="#section-4" data-name="section-4">Kontakt</a>
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

// calculate dynamic styles again if user changes screen orientation
// timeout added to make sure that the client height is calculated correctly
screen.orientation.addEventListener(`change`, () => {
  setTimeout(() => {
    dynamicStyles();
  }, 10);
});

/* ----- main page functionality ----- */

if (index) {
  /* ----- variables ----- */

  const menuIcon = document.querySelector(`.menu-icon`);
  const menuIconBar1 = document.querySelector(`.menu-icon-bar1`);
  const menuIconBar2 = document.querySelector(`.menu-icon-bar2`);
  const menuIconBar3 = document.querySelector(`.menu-icon-bar3`);
  const headerNav = document.querySelector(`.header-nav`);
  const section1 = document.querySelector(`#section-1`);
  const btnLearnMore = document.querySelector('.btn__learn-more');
  const allSections = document.querySelectorAll(`.section`);
  const imgTargets = document.querySelectorAll(`img[data-src]`);

  /* ----- functions ----- */

  const openCloseMobileMenu = function () {
    menuIcon.classList.toggle(`menu-icon--open`);
    menuIconBar1.classList.toggle(`menu-icon-bar1-x`);
    menuIconBar2.classList.toggle(`menu-icon-bar2-x`);
    menuIconBar3.classList.toggle(`menu-icon-bar3-x`);
    headerNav.classList.toggle(`header-nav--open`);
  };

  /* ----- mobile menu ----- */

  menuIcon.addEventListener(`click`, openCloseMobileMenu);

  /* ----- smooth scrolling ----- */

  btnLearnMore.addEventListener(`click`, function (e) {
    e.preventDefault();
    section1.scrollIntoView({ behavior: `smooth` });
  });

  headerNav.addEventListener(`click`, function (e) {
    e.preventDefault();
    if (e.target.classList.contains(`header-nav__link`)) {
      const sectionId = e.target.dataset.name; // data-name
      const targetSection = document.querySelector(`#${sectionId}`); // searches corresponding section

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: `smooth` }); // scrolls to corresponding section
        openCloseMobileMenu();
      }
    }
  });

  /* ----- reveal sections on scroll ----- */

  const revealSection = function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.remove(`section--hidden`);
      observer.unobserve(entry.target);
    });
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add(`section--hidden`);
  });

  /* ----- lazy loading images ----- */

  const loadImg = function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      // replace src with data-src
      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener(`load`, function () {
        entry.target.classList.remove(`section-1__img-overlay`);
      });

      observer.unobserve(entry.target);
    });
  };

  const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: `200px`,
  });

  imgTargets.forEach((img) => imgObserver.observe(img));
}

/* ----- header animation ----- */
// make header transparent and smaller when scrolling down

const headerTransparent = function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) header.classList.remove(`header--transparent`);
    else header.classList.add(`header--transparent`);
  });
};

const h1Observer = new IntersectionObserver(headerTransparent, {
  root: null,
  threshold: 0,
  rootMargin: `-${headerHeight}px`,
});

h1Observer.observe(h1);
