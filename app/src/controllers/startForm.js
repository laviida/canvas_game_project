import { DIFFICULTY, GAMEMODE } from "../constants/constants.js";
import { ScreenManager } from "../managers/screen_manager.js";

export function startForm() {
    Splitting();
    $("#myModal").modal({ backdrop: "none" });
    window.addEventListener("keyup", keyupHandler);
}

function keyupHandler(e) {
    if (e.type == "keyup") {
        const buttons = document.getElementsByClassName("buttons")[0];
        const actual = buttons.getElementsByClassName("purple-with-blue")[0];
        if (e.key == "ArrowUp") (setSelected(actual.previousElementSibling ? actual.previousElementSibling : buttons.lastElementChild));
        else if (e.key == "ArrowDown") (setSelected(actual.nextElementSibling ? actual.nextElementSibling : buttons.firstElementChild));
        else if (e.key == "Enter" && actual.id == "start_game") startGame();
        else if (e.key == "ArrowRight" || e.key == "ArrowLeft") {
            const k = e.key == "ArrowRight" ? 1 : -1;
            switch (actual.id) {
                case "gamemode":
                    changeGamemode(actual);
                    break;
                case "difficulty":
                    changeDifficulty(actual, k);
                    break;
                default:
                    break;
            }
        }
    }
}

function startGame() {
    window.removeEventListener("keyup", keyupHandler);
    if (window.game.gamemode == GAMEMODE.SELECTION) ScreenManager.showMapSelection();
    else {
        ScreenManager.showGame();
        setTimeout(() => window.game.start(), 50);
    }
}

function changeGamemode(element) {
    const _gamemode = element.dataset.gamemode == GAMEMODE.ARCADE ? GAMEMODE.SELECTION : GAMEMODE.ARCADE;
    window.game.gamemode = _gamemode;
    element.dataset.gamemode = _gamemode;
    element.innerHTML = `GAMEMODE: ${_gamemode}`;
}

function changeDifficulty(e, key) {
    const newIndex = Object.values(DIFFICULTY).findIndex(d => d == e.dataset.difficulty) + key;
    const arrayDifficulty = Object.values(DIFFICULTY);
    const difficulty = newIndex >= arrayDifficulty.length ? arrayDifficulty[0] : newIndex <= 0 ? arrayDifficulty[arrayDifficulty.length - 1] : arrayDifficulty[newIndex];

    window.game.difficulty = difficulty;
    e.dataset.difficulty = difficulty;
    e.innerHTML = `DIFFICULTY: ${difficulty}`;
}


function setSelected(actual) {
    Array.from(document.querySelectorAll(".buttons span")).forEach(b => b.classList.remove("purple-with-blue"));
    actual.classList.add("purple-with-blue");
}