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

/*album.htmlここから*/
/* ==============================
   アルバムスライダー
   3枚表示・1枚ずつ移動
================================ */

document.querySelectorAll(".album-section").forEach((section) => {

  const viewport = section.querySelector(".album-viewport");
  const track = section.querySelector(".album-track");

  const items = Array.from(
    section.querySelectorAll(".album-item")
  );

  const prevButton =
    section.querySelector(".album-prev");

  const nextButton =
    section.querySelector(".album-next");

  const dotsContainer =
    section.querySelector(".album-dots");


  /* 常に3枚表示 */
  const visibleCount = 3;

  /* 現在の先頭位置 */
  let currentIndex = 0;

  /*
    例えば写真10枚なら
    0〜7まで移動できる
    最後は8・9・10枚目が表示
  */
  const maxIndex =
    Math.max(0, items.length - visibleCount);



  /* ==============================
     ドット作成
  ============================== */

  if (dotsContainer) {

    dotsContainer.innerHTML = "";

    for (let i = 0; i <= maxIndex; i++) {

      const dot =
        document.createElement("button");

      dot.classList.add("album-dot");

      if (i === 0) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", () => {

        currentIndex = i;

        updateSlider();

      });

      dotsContainer.appendChild(dot);

    }

  }



  /* ==============================
     スライダー更新
  ============================== */

  function updateSlider() {

    if (items.length === 0) return;


    /*
      写真1枚の横幅
    */
    const itemWidth =
      items[0].getBoundingClientRect().width;


    /*
      gap取得
    */
    const trackStyle =
      window.getComputedStyle(track);

    const gap =
      parseFloat(trackStyle.gap) || 0;


    /*
      1枚分だけ横へ移動
    */
    const moveAmount =
      (itemWidth + gap) * currentIndex;


    track.style.transform =
      `translateX(-${moveAmount}px)`;


    /* ドット更新 */

    const dots =
      section.querySelectorAll(".album-dot");

    dots.forEach((dot, index) => {

      dot.classList.toggle(
        "active",
        index === currentIndex
      );

    });


    /* 左右ボタン状態 */

    if (prevButton) {

      prevButton.classList.toggle(
        "disabled",
        currentIndex === 0
      );

    }

    if (nextButton) {

      nextButton.classList.toggle(
        "disabled",
        currentIndex === maxIndex
      );

    }

  }



  /* ==============================
     次へ
  ============================== */

  if (nextButton) {

    nextButton.addEventListener(
      "click",
      () => {

        if (currentIndex < maxIndex) {

          currentIndex++;

          updateSlider();

        }

      }
    );

  }



  /* ==============================
     前へ
  ============================== */

  if (prevButton) {

    prevButton.addEventListener(
      "click",
      () => {

        if (currentIndex > 0) {

          currentIndex--;

          updateSlider();

        }

      }
    );

  }



  /* ==============================
     ウィンドウサイズ変更
  ============================== */

  window.addEventListener(
    "resize",
    updateSlider
  );



  /* 初期表示 */

  updateSlider();

});
const albumLists =
    document.querySelectorAll('.list');

const albumObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        'album-show'
                    );

                    albumObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );

albumLists.forEach(list => {
    albumObserver.observe(list);
});
/*album.htmlここまで*/