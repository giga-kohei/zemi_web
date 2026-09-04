/* まとめたページ用 */
function showGrade(id) {

    document.querySelectorAll(".grade-content").forEach(function (content) {
        content.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    const gradeButtons = document.querySelectorAll(".grade-buttons button");

    gradeButtons.forEach(function (btn) {
        btn.classList.remove("active");
    });

    if (id === "grade2") {
        gradeButtons[0].classList.add("active");
    } else if (id === "grade3") {
        gradeButtons[1].classList.add("active");
    } else {
        gradeButtons[2].classList.add("active");
    }
}

window.onload = function () {
    showGrade("grade4");
};
