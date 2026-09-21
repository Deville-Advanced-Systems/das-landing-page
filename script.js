document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".site-loader");
  const header = document.querySelector(".header");
  const menu = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = [...document.querySelectorAll(".nav-links a:not(.nav-cta)")];
  const backTop = document.querySelector(".back-top");
  const year = document.getElementById("year");
  const reveals = document.querySelectorAll(".reveal");

  /* =========================================
     SAFE SITE LOADER
     ========================================= */

  const hideLoader = () => {
    if (!loader) return;

    loader.classList.add("hide");

    // Make sure the hidden loader can never block
    // clicks, scrolling, or other interactions.
    setTimeout(() => {
      loader.style.pointerEvents = "none";
    }, 600);
  };

  // Hide the loader shortly after the HTML is ready.
  // We do NOT wait for every image/resource to finish.
  setTimeout(hideLoader, 250);

  // Absolute safety fallback.
  // The loader can never remain on screen indefinitely.
  setTimeout(hideLoader, 2000);


  /* =========================================
     HEADER + SCROLL UI
     ========================================= */

  const updateScrollUI = () => {
    const y = window.scrollY;

    header?.classList.toggle("scrolled", y > 20);
    backTop?.classList.toggle("show", y > 650);
  };

  updateScrollUI();

  window.addEventListener("scroll", updateScrollUI, {
    passive: true
  });


  /* =========================================
     MOBILE MENU
     ========================================= */

  menu?.addEventListener("click", () => {
    const open = navLinks?.classList.toggle("open");

    menu.setAttribute("aria-expanded", String(open));

    document.body.classList.toggle("no-scroll", open);
  });

  navItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks?.classList.remove("open");

      menu?.setAttribute("aria-expanded", "false");

      document.body.classList.remove("no-scroll");
    });
  });


  /* =========================================
     SCROLL REVEAL
     ========================================= */

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    reveals.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers that do not support
    // IntersectionObserver.
    reveals.forEach(element => {
      element.classList.add("visible");
    });
  }


  /* =========================================
     ACTIVE NAVIGATION SECTION
     ========================================= */

  if ("IntersectionObserver" in window) {
    const sections = [
      ...document.querySelectorAll("main section[id]")
    ];

    const sectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;

          navItems.forEach(link => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${id}`
            );
          });
        });
      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }


  /* =========================================
     CURRENT YEAR
     ========================================= */

  if (year) {
    year.textContent = new Date().getFullYear();
  }
});
