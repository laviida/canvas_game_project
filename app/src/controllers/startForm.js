import { Constants } from "../utils/constants.js";
import { ScreenManager } from "../managers/screen_manager.js";

export function startForm() {
    Splitting();
    $("#myModal").modal({
        backdrop: "none"
    });

    document.getElementById("gamemode").addEventListener("click", (e) => {
        changeGamemode(e.target);
        setSelected(e.target);
    });

    document.getElementById("difficulty").addEventListener("click", (e) => {
        changeDifficulty(e.target);
        setSelected(e.target);
    });

    window.addEventListener("keyup", keyupHandler);
    document.getElementById("start_game").addEventListener("click", () => startGame(), { once: true });
}

function keyupHandler(e) {
    if (e.type == "keyup") {
        var buttons = document.getElementsByClassName("buttons")[0];
        var actual = buttons.getElementsByClassName("purple-with-blue")[0];
        if (e.key == "ArrowUp") (setSelected(actual.previousElementSibling ? actual.previousElementSibling : buttons.lastElementChild));
        else if (e.key == "ArrowDown") (setSelected(actual.nextElementSibling ? actual.nextElementSibling : buttons.firstElementChild));
        else if (e.key == "Enter") {
            switch (actual.id) {
                case "gamemode":
                    changeGamemode(actual);
                    break;
                case "difficulty":
                    changeDifficulty(actual);
                    break;
                case "start_game":
                    startGame();
                    break;
                default:
                    break;
            }
        }
    }
}

function startGame() {
    window.removeEventListener("keyup", keyupHandler);
    if (window.game.gamemode == Constants.gamemode().SELECTION) ScreenManager.showMapSelection();
    else {
        ScreenManager.showGame();
        setTimeout(() => window.game.start(), 50);
    }
}

function changeGamemode(element) {
    let _gamemode = element.dataset.gamemode == Constants.gamemode().ARCADE ? Constants.gamemode().SELECTION : Constants.gamemode().ARCADE;
    window.game.gamemode = _gamemode;
    element.dataset.gamemode = _gamemode;
    element.innerHTML = "GAMEMODE: " + _gamemode;
}

function changeDifficulty(element) {
    let id_difficulty = (parseInt(element.dataset.difficulty) + 1) == Constants.difficulty().length ? 0 : parseInt(element.dataset.difficulty) + 1;
    window.game.difficulty = Constants.difficulty()[id_difficulty];
    element.dataset.difficulty = id_difficulty;
    element.innerHTML = "DIFFICULTY: " + Constants.difficulty()[id_difficulty];
}


function setSelected(actual) {
    Array.from(document.querySelectorAll(".buttons a")).forEach(b => b.classList.remove("purple-with-blue"));
    actual.classList.add("purple-with-blue");
}