'use strict';

// ----- variables -----

const header = document.querySelector(`.header`);
const h1 = document.querySelector(`h1`);
const index = document.querySelector(`.index`);

const headerHeight = header.getBoundingClientRect().height;

// ----- dynamic styles -----

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

// ----- header animation -----
// make header transparent and smaller when scrolling down

const headerTransparent = function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting)
            header.classList.remove(`header--transparent`);
        else header.classList.add(`header--transparent`);
    });
};

const h1Observer = new IntersectionObserver(headerTransparent, {
    root: null,
    threshold: 0,
    rootMargin: `-${headerHeight}px`,
});

h1Observer.observe(h1);
