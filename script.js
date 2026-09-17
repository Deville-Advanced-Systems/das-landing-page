document.addEventListener("DOMContentLoaded", () => {
  const loader = document.querySelector(".site-loader");
  const header = document.querySelector(".header");
  const menu = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = [...document.querySelectorAll(".nav-links a:not(.nav-cta)")];
  const backTop = document.querySelector(".back-top");
  const year = document.getElementById("year");
  const reveals = document.querySelectorAll(".reveal");

  window.addEventListener("load", () => {
    setTimeout(() => loader?.classList.add("hide"), 250);
  });

  const updateScrollUI = () => {
    const y = window.scrollY;
    header?.classList.toggle("scrolled", y > 20);
    backTop?.classList.toggle("show", y > 650);
  };
  updateScrollUI();
  window.addEventListener("scroll", updateScrollUI, { passive: true });

  menu?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("no-scroll", open);
  });

  navItems.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menu?.setAttribute("aria-expanded", "false");
      document.body.classList.remove("no-scroll");
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => observer.observe(el));

  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navItems.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${id}`));
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => sectionObserver.observe(section));

  if (year) year.textContent = new Date().getFullYear();
});
