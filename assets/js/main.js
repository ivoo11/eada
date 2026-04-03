(function () {
  "use strict";

  // Helpers
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  const on = (type, el, listener, all = false) => {
    const elements = select(el, all);
    if (!elements) return;
    if (all) elements.forEach((e) => e.addEventListener(type, listener));
    else elements.addEventListener(type, listener);
  };

  // Navbar links active state on scroll
  const navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    const position = window.scrollY + 200;

    navbarlinks.forEach((link) => {
      if (!link.hash) return;
      const section = select(link.hash);
      if (!section) return;

      const inRange =
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight;

      link.classList.toggle("active", inRange);
    });
  };

  window.addEventListener("load", navbarlinksActive);
  window.addEventListener("scroll", navbarlinksActive);

  // Scroll to (with header offset)
  const scrollto = (hash) => {
    const header = select("#header");
    const target = select(hash);
    if (!header || !target) return;

    const offset = header.offsetHeight;
    const y = target.offsetTop - offset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // Back to top button
  const backtotop = select(".back-to-top");
  const toggleBacktotop = () => {
    if (!backtotop) return;
    backtotop.classList.toggle("active", window.scrollY > 100);
  };

  window.addEventListener("load", toggleBacktotop);
  window.addEventListener("scroll", toggleBacktotop);

  // Mobile nav toggle
  on("click", ".mobile-nav-toggle", function () {
    const navbar = select("#navbar");
    if (!navbar) return;

    navbar.classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  // Scroll with offset on links with .scrollto
  on(
    "click",
    ".scrollto",
    function (e) {
      if (!this.hash) return;
      const target = select(this.hash);
      if (!target) return;

      e.preventDefault();

      const navbar = select("#navbar");
      if (navbar && navbar.classList.contains("navbar-mobile")) {
        navbar.classList.remove("navbar-mobile");
        const navbarToggle = select(".mobile-nav-toggle");
        navbarToggle?.classList.toggle("bi-list");
        navbarToggle?.classList.toggle("bi-x");
      }

      scrollto(this.hash);
    },
    true
  );

  // Scroll with offset on page load if hash in url
  window.addEventListener("load", () => {
    if (window.location.hash && select(window.location.hash)) {
      scrollto(window.location.hash);
    }
  });

  // AOS init
  window.addEventListener("load", () => {
    if (window.AOS) {
      AOS.init({
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      });
    }
  });
})();