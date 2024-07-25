(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (() => {
        const btnLeft = document.querySelector(".button-left");
        const btnRight = document.querySelector(".button-right");
        const ipt = document.querySelector("#one");
        const btnbutton = document.querySelector(".btnbutton__text");
        const btnradio = document.querySelector(".btnradio");
        const optionInput = document.querySelectorAll(".option-input");
        const paper = document.querySelector(".paper");
        const rock = document.querySelector(".rock");
        const scissors = document.querySelector(".scissors");
        const scoreRight = document.querySelector(".score__right");
        const scoreLeft = document.querySelector(".score__left");
        const newDivComp = document.querySelector(".winner-txt");
        let imgTxtGame = document.querySelector(".img-txtGame");
        let imgTxtPc = document.querySelector(".img-txtPc");
        let current = 0;
        let currentLeft = 0;
        const hideElements = (...elements) => elements.forEach((el => el.classList.add("hide")));
        const showRandomElement = elements => {
            hideElements(...elements);
            elements[Math.floor(Math.random() * elements.length)].classList.remove("hide");
        };
        const updateScores = isRightWin => {
            if (isRightWin) scoreRight.textContent = ++current; else scoreLeft.textContent = ++currentLeft;
            if (current >= 5) {
                newDivComp.textContent = "Выиграл Компьютер";
                resetGame();
                setTimeout((() => {
                    imgTxtPc.style.color = "#deb900";
                }), "800");
            } else if (currentLeft >= 5) {
                newDivComp.textContent = "Выиграл ИГРОК";
                resetGame();
                setTimeout((() => {
                    imgTxtGame.style.color = "#deb900";
                }), "800");
            }
        };
        const resetGame = () => {
            current = 0;
            currentLeft = 0;
            scoreRight.textContent = current;
            scoreLeft.textContent = currentLeft;
        };
        const checkWinner = () => {
            if (1 === current || 1 === currentLeft) newDivComp.textContent = "ИГРА ДО 5 ОЧКОВ";
            if (0 === current || 0 === currentLeft) {
                imgTxtGame.style.color = "#9FAAB7";
                imgTxtPc.style.color = "#9FAAB7";
            }
        };
        const compareSelections = () => {
            const paperR = document.querySelector(".paper-right");
            const rockR = document.querySelector(".rock-right");
            const scissorsR = document.querySelector(".scissors-right");
            const rightSelections = [ paperR, rockR, scissorsR ];
            hideElements(paperR, rockR, scissorsR);
            showRandomElement(rightSelections);
            if (!paper.classList.contains("hide") && paperR.classList.contains("hide")) if (scissorsR.classList.contains("hide")) updateScores(false); else updateScores(true);
            if (!scissors.classList.contains("hide") && scissorsR.classList.contains("hide")) if (rockR.classList.contains("hide")) updateScores(false); else updateScores(true);
            if (!rock.classList.contains("hide") && rockR.classList.contains("hide")) if (paperR.classList.contains("hide")) updateScores(false); else updateScores(true);
            checkWinner();
        };
        optionInput.forEach((section => {
            section.addEventListener("click", (() => {
                hideElements(paper, rock, scissors);
                const dataTab = section.getAttribute("data-tab");
                document.querySelector(dataTab).classList.remove("hide");
                compareSelections();
            }));
        }));
        const handleFullRandom = () => {
            if (ipt.checked) {
                btnLeft.classList.add("hide");
                btnRight.classList.remove("hide");
                btnbutton.classList.remove("hide");
                btnradio.classList.add("hide");
            } else {
                btnLeft.classList.remove("hide");
                btnRight.classList.add("hide");
                btnbutton.classList.add("hide");
                btnradio.classList.remove("hide");
            }
            resetGame();
        };
        ipt.addEventListener("click", handleFullRandom);
        btnbutton.addEventListener("click", (() => {
            const leftSelections = [ paper, rock, scissors ];
            showRandomElement(leftSelections);
            compareSelections();
        }));
    }));
    window["FLS"] = true;
    isWebp();
})();