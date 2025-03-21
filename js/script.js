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

// calculate dynamic styles again if user changes screen orientation
// timeout added to make sure that the client height is calculated correctly
screen.orientation.addEventListener(`change`, () => {
  setTimeout(() => {
    dynamicStyles();
  }, 10);
});

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
  const tabs = document.querySelectorAll(`.offers__tab`);
  const tabsContainer = document.querySelector(`.offers__tab-container`);
  const tabsContent = document.querySelectorAll(`.offers__content`);
  const sliderBtnRight = document.querySelector(`.slider__btn--right`);
  const sliderBtnLeft = document.querySelector(`.slider__btn--left`);
  const sliderDots = document.querySelector(`.slider__dots`);
  const slides = document.querySelectorAll(`.slide`);
  const maxSlide = slides.length - 1;
  let curSlide = 0;

  /* ----- functions ----- */

  const openCloseMobileMenu = function () {
    menuIcon.classList.toggle(`menu-icon--open`);
    menuIconBar1.classList.toggle(`menu-icon-bar1-x`);
    menuIconBar2.classList.toggle(`menu-icon-bar2-x`);
    menuIconBar3.classList.toggle(`menu-icon-bar3-x`);
    headerNav.classList.toggle(`header-nav--open`);
  };

  const closeMobileMenu = function () {
    menuIcon.classList.remove(`menu-icon--open`);
    menuIconBar1.classList.remove(`menu-icon-bar1-x`);
    menuIconBar2.classList.remove(`menu-icon-bar2-x`);
    menuIconBar3.classList.remove(`menu-icon-bar3-x`);
    headerNav.classList.remove(`header-nav--open`);
  };

  const menuFadeAnimation = function (e) {
    if (e.target.classList.contains(`header-nav__link`)) {
      const link = e.target;
      const siblings = link
        .closest(`.header-nav`)
        .querySelectorAll(`.header-nav__link`);

      siblings.forEach((sibling) => {
        if (sibling !== link) sibling.style.opacity = this;
      });
    }
  };

  /* ----- mobile menu ----- */

  menuIcon.addEventListener(`click`, openCloseMobileMenu);

  /* ----- nav: menu fade animation ----- */

  headerNav.addEventListener(`mouseover`, menuFadeAnimation.bind(0.5));
  headerNav.addEventListener(`mouseout`, menuFadeAnimation.bind(1));

  /* ----- smooth scrolling ----- */

  btnLearnMore.addEventListener(`click`, function (e) {
    e.preventDefault();
    section1.scrollIntoView({ behavior: `smooth` });
  });

  headerNav.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`header-nav__link`)) {
      e.preventDefault();
      const id = e.target.getAttribute(`href`); // relative (not absolute) url

      document.querySelector(id).classList.remove(`section--transition`); // otherwise section is partly displayed behind header
      document.querySelector(id).classList.remove(`section--hidden`); // otherwise section is partly displayed behind header
      document.querySelector(id).scrollIntoView({ behavior: `smooth` });
      closeMobileMenu();
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

    section.classList.add(`section--transition`); // necessary to remove for smooth scrolling to work as expected
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

  /* ----- tabbed component (Angebote) ----- */

  tabsContainer.addEventListener(`click`, function (e) {
    const clicked = e.target.closest(`.offers__tab`);

    // guard clause
    if (!clicked) return;

    // remove active classes
    tabs.forEach((tab) => tab.classList.remove(`offers__tab--active`));
    tabsContent.forEach((content) =>
      content.classList.remove(`offers__content--active`)
    );

    // activate tab and content
    clicked.classList.add(`offers__tab--active`);
    document
      .querySelector(`.offers__content-${clicked.dataset.tab}`)
      .classList.add(`offers__content--active`);
  });

  /* ----- slider (Rezensionen) ----- */

  const slider = function () {
    const createDots = function () {
      slides.forEach(function (_, i) {
        sliderDots.insertAdjacentHTML(
          `beforeend`,
          /*HTML*/
          `<button
          class="slider__dot"
        data-slide="${i}"
        ></button>`
        );
      });
    };
    createDots();

    const activateDot = function (slide) {
      document
        .querySelectorAll(`.slider__dot`)
        .forEach((dot) => dot.classList.remove(`slider__dot--active`));

      document
        .querySelector(`.slider__dot[data-slide="${slide}"]`)
        .classList.add(`slider__dot--active`);
    };

    const goToSlide = function (slide) {
      slides.forEach((s, i) => {
        s.classList.remove(`slide--active`);
        if (i === slide) {
          s.classList.add(`slide--active`);
          s.querySelector(
            `.slide__img`
          ).style.backgroundImage = `url(../img/rezension-${i}.jpg)`;
        }
      });
    };
    goToSlide(0);
    activateDot(0);

    const nextSlide = function () {
      if (curSlide === maxSlide) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
      sliderBtnRight.blur();
    };
    const previousSlide = function () {
      if (curSlide === 0) {
        curSlide = maxSlide;
      } else {
        curSlide--;
      }
      goToSlide(curSlide);
      activateDot(curSlide);
      sliderBtnLeft.blur();
    };

    sliderBtnRight.addEventListener(`click`, nextSlide);
    sliderBtnLeft.addEventListener(`click`, previousSlide);

    document.addEventListener(`keydown`, function (e) {
      if (e.key === `ArrowRight`) nextSlide();
      if (e.key === `ArrowLeft`) previousSlide();
    });

    sliderDots.addEventListener(`click`, function (e) {
      if (e.target.classList.contains(`slider__dot`)) {
        curSlide = Number(e.target.dataset.slide);
        goToSlide(curSlide);
        activateDot(curSlide);
        e.target.blur();
      }
    });
  };
  slider();
}
