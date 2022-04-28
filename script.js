"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling

btnScrollTo.addEventListener("click", (e) => {
  const s1coords = section1.getBoundingClientRect();

  // Scrolling (old way)
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);
  // console.log(
  //   "height/width viewport",
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  // Modern Way of Scrolling
  section1.scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// Page navigation

// document.querySelectorAll(".nav__link").forEach((e) => {
//   e.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");

//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

// Event Delegation - adding one event listener to the parent instead of all the children
// 1. Add event listener to common parent element
// 2. Determine what element orignated the event

document.querySelector(".nav__links").addEventListener("click", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// //////////////////
// // DOM Traversing

// const h1 = document.querySelector("h1");

// // Going downwards: child
// h1.querySelectorAll(".className");
// h1.childNotes;
// h1.children;
// h1.firstElementChild.style.color = "white";
// h1.lastElementChild.style.color = "orangered";

// // Going upwards: parents
// h1.parentNode;
// h1.parentElement;

// h1.closest(".header").style.background = "var(--gradient-secondary)";
// h1.closest("h1").style.background = "var(--gradient-primary)";

// // Going sideways: siblings
// h1.previousElementSibling;
// h1.nextElementSibling;

// h1.previousSibling;
// h1.nextSibling;

// h1.parentElement.children;
// [...h1.parentElement.children].forEach(function (el) {
//   if (el !== h1) el.style.transform = "scale(0.5)";
// });

///////////////////////////////////////
// Tabbed Component

// One way to add the event listeners but not the best way
// tabs.forEach((tab) => tab.addEventListener("click", () => console.log("tab")));

// Use event delegation
tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });

  tabsContent.forEach((tab) => {
    tab.classList.remove("operations__content--active");
  });

  // Active tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////////////////////////
// Menu Fade Animation

// Option #1
// const handleHover = (e, opacity) => {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     siblings.forEach((el) => {
//       if (el !== link) {
//         el.style.opacity = opacity;
//       }
//     });
//     logo.style.opacity = opacity;
//   }
// };

// Options # 2
// Note: the handleHover function can no longer be an arrow function for the 'this' keyword to bind correctly
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// Option #1: Have a callback function with a function inside
// nav.addEventListener("mouseover", (e) => handleHover(e, 0.5));
// nav.addEventListener("mouseout", (e) => handleHover(e, 1));

// Option #2: Use bind method
// The "argument" or this keyword is now the opacity value and the event currentTarget stays the same
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
