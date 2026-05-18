(function () {
  const cursor = document.querySelector(".cursor-dot");
  const formMessages = new WeakMap();

  if (cursor && window.matchMedia("(pointer: fine)").matches) {
    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;

    window.addEventListener("pointermove", (event) => {
      tx = event.clientX;
      ty = event.clientY;
      cursor.style.opacity = "1";
    });

    function tick() {
      x += (tx - x) * 0.35;
      y += (ty - y) * 0.35;
      cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }

    tick();
  }

  document.addEventListener("submit", (event) => {
    const form = event.target.closest(".contact-form");
    if (!form) return;
    event.preventDefault();

    const button = form.querySelector("button");
    const previous = formMessages.get(form);
    if (previous) {
      clearTimeout(previous);
    }

    const originalText = button.textContent;
    button.textContent = "SENT";
    button.disabled = true;

    const timer = window.setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      form.reset();
    }, 1100);

    formMessages.set(form, timer);
  });
})();
