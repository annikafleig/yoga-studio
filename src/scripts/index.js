'use strict';

// ----- variables -----

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

// ----- functions -----

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

const smoothScrolling = function (section) {
    section.classList.remove(`section--transition`); // otherwise section is partly displayed behind header
    section.classList.remove(`section--hidden`); // otherwise section is partly displayed behind header
    section.scrollIntoView({ behavior: `smooth` });
};

// ----- mobile menu -----

menuIcon.addEventListener(`click`, openCloseMobileMenu);

// ----- nav: menu fade animation -----

headerNav.addEventListener(`mouseover`, menuFadeAnimation.bind(0.5));
headerNav.addEventListener(`mouseout`, menuFadeAnimation.bind(1));

// ----- smooth scrolling -----

btnLearnMore.addEventListener(`click`, function (e) {
    e.preventDefault();

    smoothScrolling(section1);
});

headerNav.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`header-nav__link`)) {
        e.preventDefault();
        const id = e.target.getAttribute(`href`); // relative (not absolute) url

        smoothScrolling(document.querySelector(id));
        closeMobileMenu();
    }
});

// ----- reveal sections on scroll -----

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

// ----- lazy loading images -----

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

// ----- tabbed component (Angebote) -----

tabsContainer.addEventListener(`click`, function (e) {
    const clicked = e.target.closest(`.offers__tab`);

    // guard clause
    if (!clicked) return;

    // remove active classes
    tabs.forEach((tab) => tab.classList.remove(`offers__tab--active`));
    tabsContent.forEach((content) =>
        content.classList.remove(`offers__content--active`),
    );

    // activate tab and content
    clicked.classList.add(`offers__tab--active`);
    document
        .querySelector(`.offers__content-${clicked.dataset.tab}`)
        .classList.add(`offers__content--active`);
});

// ----- slider (Rezensionen) -----

const slider = function () {
    const createDots = function () {
        slides.forEach(function (_, i) {
            sliderDots.insertAdjacentHTML(
                `beforeend`,
                /*HTML*/
                `<button
          class="slider__dot"
        data-slide="${i}"
        ></button>`,
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
                s.querySelector(`.slide__img`).style.backgroundImage =
                    `url(/images/rezension-${i}.jpg)`;
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
