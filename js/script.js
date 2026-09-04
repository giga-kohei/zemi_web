/* =========================================
   スマホ用ハンバーガーメニュー
========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const menuToggle = document.querySelector(".menu-toggle");
  const headerNav = document.querySelector(".header-nav");

  if (!menuToggle || !headerNav) {
    return;
  }

  menuToggle.addEventListener("click", function () {
    const isOpen = headerNav.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.querySelectorAll(".nav-dropdown > .nav-main").forEach(function (toggle) {

    toggle.addEventListener("click", function (event) {

      if (window.innerWidth > 900) {
        return;
      }

      event.preventDefault();

      const parent = toggle.closest(".nav-dropdown");

      document.querySelectorAll(".nav-dropdown.open").forEach(function (openDropdown) {
        if (openDropdown !== parent) {
          openDropdown.classList.remove("open");
        }
      });

      parent.classList.toggle("open");

    });

  });

  window.addEventListener("resize", function () {

    if (window.innerWidth > 900) {
      headerNav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");

      document.querySelectorAll(".nav-dropdown.open").forEach(function (openDropdown) {
        openDropdown.classList.remove("open");
      });
    }

  });

});


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
  if (counters.length === 0) return;

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

/*activity.htmlここから*/
/* ======================================
   ゼミ活動ページ
====================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       対象を取得
    ============================== */

    const mainCard =
        document.querySelector(".activity-main-card");

    const activitySteps =
        document.querySelectorAll(".activity-step");

    const flowArrows =
        document.querySelectorAll(".activity-flow-arrow");


    /* ==============================
       最初は非表示状態にする
    ============================== */

    if (mainCard) {
        mainCard.classList.add("activity-fade");
    }

    activitySteps.forEach(function (step) {
        step.classList.add("activity-fade");
    });


    /* ==============================
       スクロールで表示
    ============================== */

    const activityObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "activity-show"
                        );

                        activityObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    /* メインカード */
    if (mainCard) {

        activityObserver.observe(
            mainCard
        );

    }


    /* 活動内容カード */
    activitySteps.forEach(function (step) {

        activityObserver.observe(
            step
        );

    });


    /* ==============================
       カードごとに少し表示をずらす
    ============================== */

    activitySteps.forEach(
        function (step, index) {

            step.style.transitionDelay =
                `${index * 0.08}s`;

        }
    );


    /* ==============================
       矢印のやさしい動き
    ============================== */

    flowArrows.forEach(function (arrow) {

        arrow.animate(

            [
                {
                    transform: "translateY(0)"
                },

                {
                    transform: "translateY(6px)"
                },

                {
                    transform: "translateY(0)"
                }
            ],

            {
                duration: 1800,
                iterations: Infinity,
                easing: "ease-in-out"
            }

        );

    });


    /* ==============================
       年間予定表ボタン
       クリック時の軽いアニメーション
    ============================== */

    const activityButton =
        document.querySelector(
            ".activity-button"
        );


    if (activityButton) {

        activityButton.addEventListener(
            "mousedown",
            function () {

                this.style.transform =
                    "translateY(-1px) scale(0.97)";

            }
        );


        activityButton.addEventListener(
            "mouseup",
            function () {

                this.style.transform = "";

            }
        );


        activityButton.addEventListener(
            "mouseleave",
            function () {

                this.style.transform = "";

            }
        );

    }

});
/*activity.htmlここまで*/

/*yearly_schedule.htmlここから*/
/* ======================================
   年間予定表ページ
====================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       対象取得
    ============================== */

    const scheduleMainCard =
        document.querySelector(".schedule-main-card");

    const scheduleTable =
        document.querySelector(".schedule-table-wrap");

    const scheduleRows =
        document.querySelectorAll(".schedule-table tbody tr");


    /* ==============================
       初期状態
    ============================== */

    if (scheduleMainCard) {
        scheduleMainCard.classList.add("schedule-fade");
    }

    if (scheduleTable) {
        scheduleTable.classList.add("schedule-fade");
    }


    /* ==============================
       スクロールでふわっと表示
    ============================== */

    const scheduleObserver =
        new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "schedule-show"
                        );

                        scheduleObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    if (scheduleMainCard) {
        scheduleObserver.observe(scheduleMainCard);
    }

    if (scheduleTable) {
        scheduleObserver.observe(scheduleTable);
    }


    /* ==============================
       行にマウスを乗せた時
       少しだけ横に動かす
    ============================== */

    scheduleRows.forEach(function (row) {

        row.addEventListener("mouseenter", function () {

            this.style.transform =
                "translateX(3px)";

        });

        row.addEventListener("mouseleave", function () {

            this.style.transform =
                "translateX(0)";

        });

    });


    /* ==============================
       表示時に少しずつ行を見せる
    ============================== */

    if (scheduleTable) {

        scheduleObserver.unobserve(scheduleTable);

        const tableObserver =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            scheduleTable.classList.add(
                                "schedule-show"
                            );

                            scheduleRows.forEach(
                                function (row, index) {

                                    row.animate(

                                        [
                                            {
                                                opacity: 0,
                                                transform:
                                                    "translateY(10px)"
                                            },

                                            {
                                                opacity: 1,
                                                transform:
                                                    "translateY(0)"
                                            }
                                        ],

                                        {
                                            duration: 350,
                                            delay: index * 35,
                                            easing: "ease-out",
                                            fill: "both"
                                        }

                                    );

                                }
                            );

                            tableObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.08
                }

            );

        tableObserver.observe(scheduleTable);

    }

});
/*yearly_schedule.htmlここまで*/

/*career_path.htmlここから*/
/* =========================================
   卒業後の進路ページ
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       年度切り替え
    ===================================== */

    const careerTabs =
        document.querySelectorAll(".career-year-tab");

    const careerContents =
        document.querySelectorAll(".career-year-content");


    careerTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const targetYear =
                this.getAttribute("data-career-year");


            /* すべての年度ボタンを解除 */
            careerTabs.forEach(function (button) {

                button.classList.remove("active");

            });


            /* すべての年度内容を非表示 */
            careerContents.forEach(function (content) {

                content.classList.remove("active");

            });


            /* 押した年度ボタンを選択状態にする */
            this.classList.add("active");


            /* 対応する年度を取得 */
            const targetContent =
                document.getElementById(targetYear);


            /* 対応する年度を表示 */
            if (targetContent) {

                targetContent.classList.add("active");

            }

        });

    });


    /* =====================================
       最初の表示を確認
    ===================================== */

    if (careerTabs.length > 0 && careerContents.length > 0) {

        const activeTab =
            document.querySelector(".career-year-tab.active");

        const activeContent =
            document.querySelector(".career-year-content.active");


        /* activeが無い場合は2024年度を表示 */
        if (!activeTab || !activeContent) {

            careerTabs.forEach(function (button) {
                button.classList.remove("active");
            });

            careerContents.forEach(function (content) {
                content.classList.remove("active");
            });


            careerTabs[0].classList.add("active");

            careerContents[0].classList.add("active");

        }

    }


    /* =====================================
       スクロールアニメーション
    ===================================== */

    const fadeTargets =
        document.querySelectorAll(
            ".career-main-card, .career-results"
        );


    fadeTargets.forEach(function (target) {

        target.classList.add("career-fade");

    });


    if ("IntersectionObserver" in window) {

        const careerObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "career-show"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.1
                }

            );


        fadeTargets.forEach(function (target) {

            careerObserver.observe(target);

        });

    } else {

        /* IntersectionObserver非対応の場合 */

        fadeTargets.forEach(function (target) {

            target.classList.add(
                "career-show"
            );

        });

    }


    /* =====================================
       年度切り替え時の軽い動き
    ===================================== */

    careerTabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            this.animate(

                [
                    {
                        transform:
                            "translateY(-2px) scale(1)"
                    },

                    {
                        transform:
                            "translateY(-2px) scale(0.96)"
                    },

                    {
                        transform:
                            "translateY(-2px) scale(1)"
                    }
                ],

                {
                    duration: 220,
                    easing: "ease-out"
                }

            );

        });

    });

});
/*career_path.htmlここまで*/

/*qualification.htmlここから*/
/* =========================================
   資格・検定ページ
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const qualificationCards =
        document.querySelectorAll(".qualification-card");

    if (qualificationCards.length === 0) {
        return;
    }


    /* 最初は非表示状態にする */

    qualificationCards.forEach(function (card) {

        card.classList.add("qualification-scroll");

    });


    /* スクロール監視 */

    const qualificationObserver =
        new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "qualification-show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    /* カードを順番に監視 */

    qualificationCards.forEach(function (card, index) {

        card.style.transitionDelay =
            `${index * 0.08}s`;

        qualificationObserver.observe(card);

    });

});
/*qualification.htmlここまで*/

/* =========================================
   共通フッター
   ページ上部へ戻る
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const topButton =
        document.querySelector(".footer-top-button");

    if (!topButton) {
        return;
    }


    /* 上へ戻るボタンをクリック */

    topButton.addEventListener("click", function (event) {

        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});