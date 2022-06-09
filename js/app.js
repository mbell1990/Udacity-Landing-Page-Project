/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
"use strict";

const navbar = document.getElementById("navbar__list");
const pageSections = document.querySelectorAll("section");
const btn = document.getElementById("scrollBtn");

// build the nav

/* function to loop through each section and create the list item with anchor tag. We can the append this to the navbar menu to dynamically create the menu list on the navbar */

function navigation() {
  pageSections.forEach((section) => {
    let li = document.createElement("li");
    li.innerHTML = `<a class="menu__link" href="#${section.id}">${section.dataset.nav}</a>`;
    navbar.appendChild(li);
  });
}

navigation();

// Add class 'active' to section when near top of viewport

/* helper function to determine if section is in viewport. */

let sectionInViewport = function (elem) {
  let bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    bounding.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    bounding.right <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
};

/* event to listner to look out for scroll. Loop sections to asses if on scroll it is in viewport then add active class. */

window.addEventListener("scroll", () => {
  pageSections.forEach((section) => {
    if (sectionInViewport(section)) {
      section.classList.add("your-active-class");
    } else {
      section.classList.remove("your-active-class");
    }
  });
});

// Scroll to anchor ID using scrollTO event

navbar.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("menu__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// fucntionality to scroll to top of page using button

/* call the function of btn scroll when user is scrolling beyond certain point */

window.onscroll = function () {
  btnScroll();
};

/* This function assesses when user has scrolled beyond a certain point on the page then displays button to give the option to scroll back to the top of the page. */

function btnScroll() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
}

/* This function takes user to top of screen when clickng the button. The onclick listener is present in HTML to allow fucntionality to work */
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
