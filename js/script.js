const fadeElements = document.querySelectorAll(".fade");

window.addEventListener("scroll", () => {
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();

    if (rect.top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});

const counters = document.querySelectorAll(".counter");
let counted = false;

window.addEventListener("scroll", () => {
  const countSection = counters[0].getBoundingClientRect().top;

  if (countSection < window.innerHeight && !counted) {
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      let count = 0;
      const speed = target / 60;

      const update = () => {
        count += speed;

        if (count < target) {
          counter.innerText = Math.ceil(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
    });

    counted = true;
  }
});

const qaItems = document.querySelectorAll(".qa-item");

qaItems.forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});