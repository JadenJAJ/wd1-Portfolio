(function () {
  const revealSelector = [
    ".about-intro",
    ".portrait-frame",
    ".home-project-card",
    ".contact-form",
    ".about-name img",
    ".goals p",
    ".experience div",
    ".education div",
    ".project-row",
    ".resume img"
  ].join(",");

  let observer;

  function bindReveals() {
    if (observer) {
      observer.disconnect();
    }

    const items = Array.from(document.querySelectorAll(revealSelector))
      .filter((item) => !item.closest(".page[hidden]"));

    items.forEach((item) => {
      item.classList.add("reveal");
      item.classList.remove("is-visible");
    });

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

    items.forEach((item) => observer.observe(item));
  }

  document.addEventListener("portfolio:routechange", bindReveals);
  bindReveals();
})();
