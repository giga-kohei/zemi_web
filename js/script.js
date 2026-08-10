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
/* graduation.htmlここから */
document.addEventListener("DOMContentLoaded", function () {

  const tabs = document.querySelectorAll(".year-tab");
  const contents = document.querySelectorAll(".year-content");

  tabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

      // すべてのボタンからactiveを外す
      tabs.forEach(function (item) {
        item.classList.remove("active");
      });

      // すべての年度を非表示
      contents.forEach(function (content) {
        content.classList.remove("active");
      });

      // 押したボタンを選択状態にする
      tab.classList.add("active");

      // 表示する年度を取得
      const target = tab.getAttribute("data-year");

      // 対応する年度を表示
      const targetContent = document.getElementById(target);

      if (targetContent) {
        targetContent.classList.add("active");
      }

    });

  });

});
/* graduation.htmlここまで */