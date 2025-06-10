"use strict";

const figureContainer = document.querySelectorAll(".figure__container");
const figure = document.querySelectorAll(".figures");
const arrLeft = document.querySelector(".arrow-left");
const arrRight = document.querySelector(".arrow-right");
const fig2 = document.querySelector(".section--6__figure--2");
const sect6media = document.querySelector(".section--6__media");
const dots = document.querySelector(".dots");
const customerArrLeft = document.querySelector(".customer-arr-left");
const customerArrRight = document.querySelector(".customer-arr-right");
const sect7 = document.querySelector(".section--7");
const doc = document.documentElement;

const hamburger = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".hamburger-menu");
const hamStrp = document.querySelector(".hamburger-stripe");
const nav = document.querySelector(".nav");
const navLists = document.querySelector(".nav__lists");
const navLinks = document.querySelectorAll(".nav__links");

const cloneNavlists = navLists.cloneNode(true);

cloneNavlists.classList.add("clone__nav__lists");

nav.append(cloneNavlists);

const HamBurgerFunction = function () {
  let hamClickCondition = true;

  //  ham animation => animate ✔️☑️☑️
  let anim = true;

  // functions

  const dismissHamburgerMenu = function () {
    // dismiss navigation/hamburger menu
    hamburgerMenu.style.clipPath = "circle(0%)";
    cloneNavlists.style.transform =
      "translateX(-50%) translateY(-50%) scale(0)";
  };

  const endHamburgerProcess = function () {
    // Close the hamburger menu
    if (hamClickCondition === false) {
      // remove hamburger icon
      this.querySelector(".hamburger-stripe").classList.remove("ham-strp");

      // ham animation => animate ✔️☑️☑️
      anim = true;
      dismissHamburgerMenu();
    }

    // the condition above happens only after the hamcondition has been made false

    // switching click condition
    hamClickCondition = !hamClickCondition;
  };

  // HAM ANIMATION
  const hamAnimation = function () {
    if (anim) hamStrp.classList.add("ham-hover-anim");
  };

  // HAM FUNCTIONALITY 🎯🎯🎯🎯🎯
  const hamFunc = function (e) {
    // display navigation/hamburger menu
    hamburgerMenu.style.clipPath = "circle(200%)";
    cloneNavlists.style.transform =
      "translateX(-50%) translateY(-50%) scale(1)";

    // ham animation => dont animate ❌❌❌
    anim = false;
    hamStrp.classList.remove("ham-hover-anim");

    const hamclicked = e.target.closest(".hamburger");

    // Display hamburger icon
    hamclicked.querySelector(".hamburger-stripe").classList.add("ham-strp");

    endHamburgerProcess.bind(hamclicked)();
  };

  // NAV ANIMATION
  hamburger.addEventListener("mouseenter", hamAnimation);

  // (MAJOR-TASK) NAV CLICK FUNCTIONALITIES
  hamburger.addEventListener("click", hamFunc);

  cloneNavlists.addEventListener("click", function (e) {
    // 🌸🌸🌸🌸🌸🌸🌸
    // e.preventDefault();
    const ListclickTarget = e.target;
    // console.log(ListclickTarget);
    // ✈️✈️✈️✈️✈️✈️✈️✈️
    navLinks.forEach((navlink) => {
      if (ListclickTarget.classList.contains("nav__links")) {
        endHamburgerProcess.bind(hamburger)();
        hamClickCondition = true;
      }
    });
  });
};

HamBurgerFunction();

const navLinksFunc = function (e) {
  e.preventDefault();
  const ListclickTarget = e.target.closest(".nav__links");
  if (!ListclickTarget) return;
  const id = ListclickTarget.getAttribute("href");
  console.log(id);
  document.querySelector(`${id}`).scrollIntoView({ behavior: "smooth" });
};

cloneNavlists.addEventListener("click", navLinksFunc);
navLists.addEventListener("click", navLinksFunc);

////////////////////////////////// ////////////////////////////////
////////////////-----------SECTION 6-----------------//////////////
////////////////////////////////// ////////////////////////////////
const section6Functionality = function () {
  // CREATE DOTS
  figure.forEach((fig, i) => {
    const members_dot = `
    <div class="dot dot${i + 1}" data-members="${i}"></div>
    `;

    dots.insertAdjacentHTML("beforeEnd", members_dot);
  });

  const dot = document.querySelectorAll(".dot");

  // COUNTERS
  let figurecount = 0;
  let transform = -27.6667;

  // DEFAULTS
  figure[0].classList.add("section--6__main");
  figure[0].querySelector(".section--6__media").style.display = "flex";
  arrLeft.style.opacity = "0";
  dot[0].classList.add("dot--active");

  // section 6 figure media icons resets
  const figMedia = document.querySelectorAll(".section--6__media");

  figMedia.forEach((figM) => {
    figM.classList.add("figMhover");
  });

  const figMhoverEl = document.querySelectorAll(".figMhover");

  const figNotHovered = function () {
    figMhoverEl.forEach((figM) => {
      figM.style.height = "0";
      figM.style.padding = "0";
      figM.querySelectorAll(".section--6__media__svg").forEach((icon) => {
        icon.style.height = "0";
      });
    });
  };

  figNotHovered();

  // figure hovered styles
  const figureHovered = function () {
    figMhoverEl[this].style.height = "4rem";
    figMhoverEl[this].style.padding = "0.5rem";
    figMhoverEl[this]
      .querySelectorAll(".section--6__media__svg")
      .forEach((icon) => {
        icon.style.height = "3rem";
      });
  };
  // section 6 figure media icons resets end

  //  MEMBER FIGURE 1 DEFAULT HOVER & NOT HOVERED EFFECT
  figure[0].addEventListener("mouseover", figureHovered.bind(figurecount));
  figure[0].addEventListener("mouseout", figNotHovered.bind(figurecount));

  // display figure media icons on small screens / smartphones & the likes
  const mediaQuery = function (fig) {
    const observeWindow = new IntersectionObserver(
      function (e) {
        const [entry] = e;

        // 800px screen size width
        if (entry.isIntersecting) {
          if (window.outerWidth <= 800) {
            figureHovered.call(fig);
          }

          // 1050px x 600px screen width & height size
          if ((window.outerWidth <= 1050) & (window.outerHeight <= 600)) {
            figureHovered.call(fig);
          }
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );

    figure.forEach((fig) => {
      observeWindow.observe(fig);
    });
  };

  // MEMBERS SLIDER 🎯
  const sliderControl = function () {
    // THE FIGURES HOVER EFFECT
    figure[figurecount].addEventListener(
      "mouseover",
      figureHovered.bind(figurecount)
    );
    figure[figurecount].addEventListener(
      "mouseout",
      figNotHovered.bind(figurecount)
    );

    dot.forEach((dt) => {
      dt.classList.remove("dot--active");
    });

    dot[this].classList.add("dot--active");

    // --------------------------------------------------//
    // ------------------ARROW OPACITY -----------------------//
    // --------------------------------------------------//

    // dismiss right Arrow at end of scroll
    if (figurecount == figure.length - 1) {
      arrRight.style.opacity = "0";
    }

    // display left Arrow at the start of scroll
    if (figurecount > 0) {
      arrLeft.style.opacity = "1";
    }
    // display right Arrow at the start of reverse scroll
    if (figurecount < figure.length - 1) {
      arrRight.style.opacity = "1";
    }

    // dismiss left Arrow at the end of reverse scroll
    if (figurecount == 0) {
      arrLeft.style.opacity = "0";
    }

    // --------------------------------------------------//
    // ------------------ARROW OPACITY END -------------------//
    // --------------------------------------------------//

    figure.forEach((fig, i) => {
      figure[i].style.transform = `translateX(-${transform}rem)`;

      // figurecount or review count
      if (figurecount === 0) {
        // figure 2 matrix adjustment
        fig2.style.transform = `translateX(${
          -1 * transform
        }rem)  matrix3d(1, 0, 0, 0.0006, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
          scale(0.8)
          `;

        figure[i].style.transform = `translateX(${-1 * transform}rem)`;
      }

      // adding the main FIGURE STYLES
      if (this <= figure.length) {
        // undisplaying media-block for all figures
        figure[i].querySelector(".section--6__media").style.display = "none";

        //   remove main Figure styling from all figures
        fig.classList.remove("section--6__main");

        //   adding main Figure styling from main figure
        figure[this].classList.add("section--6__main");

        // displaying media-block on only main figures
        figure[this].querySelector(".section--6__media").style.display = "flex";
      }

      // the matrix functionalities
      if (i < this) {
        figure[
          i
        ].style.transform = `translateX(-${transform}rem) matrix3d(1, 0, 0, -0.0006, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) scale(0.8)`;
      }

      if (i > this) {
        figure[
          i
        ].style.transform = `translateX(-${transform}rem) matrix3d(1, 0, 0, 0.0006, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
          scale(0.8)`;
      }
    });
  };

  // RIGHT ARROW
  arrRight.addEventListener("click", function () {
    // the FIGURE MOVEMENT
    if (figurecount !== figure.length - 1) {
      transform = transform + 27.6667;
      figurecount++;
    }

    sliderControl.bind(figurecount)();
  });

  // LEFT ARROW
  arrLeft.addEventListener("click", function () {
    // the FIGURE MOVEMENT
    if (figurecount > 0) {
      transform = transform - 27.6667;
      figurecount--;
    }

    sliderControl.bind(figurecount)();
  });

  // DEFAULT FIGURE HOVER - MEDIA icons DISPLAY
  mediaQuery(0);
  // DOTS FUNCTIONALITY 😐😐
  dots.addEventListener("click", function (e) {
    dot.forEach((dt, i, arr) => {
      dt.classList.remove("dot--active");
    });

    if (e.target.classList.contains("dot")) {
      const clicked = e.target;

      const dot = clicked.closest(".dot");

      // DOT ACTIVE STYLE
      dot.classList.add("dot--active");

      const dataset = dot.getAttribute("data-members");
      console.log(dataset);

      transform = 27.6667 * dataset - 27.6667;
      figurecount = dataset;

      if (figurecount == 0) {
        figure.forEach(
          (fig) => (fig.style.transform = `translateX(${-1 * transform}rem)`)
        );

        // figure 2 matrix adjustment
        fig2.style.transform = `translateX(${
          -1 * transform
        }rem)  matrix3d(1, 0, 0, 0.0006, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
          scale(0.8)
          `;
      }

      mediaQuery(figurecount);

      sliderControl.bind(figurecount)();
    }
  });
};
section6Functionality();

// ///////////////////////////////////////////////////////////////////////////////

const section7functionality = function () {
  const customerBox = document.querySelectorAll(".customer__boxes");

  const customerContainer = document.querySelector(".reviews__container");

  let customerSlide;
  let lengthTracker = 0;

  customerContainer.scrollIntoView();
  const condition = true;

  const customerSlideFunc = function () {
    customerContainer.scrollBy({
      left: `${customerSlide}`,
      behavior: "smooth",
    });
    if (lengthTracker === customerBox.length) {
      setTimeout(() => {
        customerContainer.scrollBy({ left: 200, behavior: "smooth" });
        customerBox.forEach((cb) => {
          cb.style.transform = "scale(0.9) translateX(-8rem)";
        });
        console.log("yaaaaaaaaaaaayyyyyyyyyyyyyyyyyyyyyyy!!!!!!!!!!!");
      }, 1000);
    }
  };

  customerArrLeft.addEventListener("click", function () {
    customerSlide = -540;
    if (lengthTracker > 0) {
      lengthTracker--;
      console.log(lengthTracker);
    }

    customerSlideFunc();
  });

  let count = 0;

  customerArrRight.addEventListener("click", function () {
    customerSlide = 540;

    if (lengthTracker < customerBox.length / 3) {
      lengthTracker++;
      console.log(lengthTracker);
      count = count + customerSlide;
      console.log(count);
    }
    customerSlideFunc();
  });
};
