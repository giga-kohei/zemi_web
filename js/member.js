const cards = document.querySelectorAll(".card");

const modal = document.querySelector(".modal");

const close = document.querySelector(".close");

cards.forEach(card => {

    const button = card.querySelector(".detail-btn");

    if(button){

        button.addEventListener("click", () => {

            const img = card.querySelector("img").src;

            const name = card.querySelector("h3").innerText;

            const text = card.querySelector("p").innerText;

            document.getElementById("modal-img").src = img;

            document.getElementById("modal-name").innerText = name;

            document.getElementById("modal-text").innerText = text;

            modal.style.display = "flex";

        });

    }

});

close.addEventListener("click", () => {

    modal.style.display = "none";

});

window.addEventListener("click", (e) => {

    if(e.target === modal){

        modal.style.display = "none";

    }

});