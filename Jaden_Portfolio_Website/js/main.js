(function () {
  const pages = Array.from(document.querySelectorAll("[data-page]"));
  const links = Array.from(document.querySelectorAll("[data-route]"));
  const app = document.querySelector("#app");
  const routes = new Set(pages.map((page) => page.dataset.page));

  function routeFromHash() {
    const route = window.location.hash.replace("#", "") || "home";
    return routes.has(route) ? route : "home";
  }

  function showRoute(route, shouldFocus) {
    pages.forEach((page) => {
      page.hidden = page.dataset.page !== route;
    });

    links.forEach((link) => {
      const active = link.dataset.route === route;
      link.classList.toggle("active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    document.body.dataset.currentPage = route;
    document.dispatchEvent(new CustomEvent("portfolio:routechange", { detail: { route } }));

    if (shouldFocus) {
      app.focus({ preventScroll: true });
    }
  }

  window.addEventListener("hashchange", () => showRoute(routeFromHash(), true));
  showRoute(routeFromHash(), false);
})();
