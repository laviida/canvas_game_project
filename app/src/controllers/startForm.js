import {
    Constants
} from "../constants.js";
export function startForm() {
    let game = window.game;
    Splitting();
    $("#myModal").modal({
        backdrop: "static"
    });
    var buttons = document.getElementsByClassName("buttons")[0];

    document.getElementById("gamemode").addEventListener("click", (e) => {
        let _gamemode = e.target.dataset.gamemode == Constants.GAMEMODE.ARCADE ? Constants.GAMEMODE.SELECTION : Constants.GAMEMODE.ARCADE;
        game.gamemode = _gamemode;
        e.target.dataset.gamemode = _gamemode;
        e.target.innerHTML = "GAMEMODE: " + _gamemode;
        setSelected(e.target);

    });

    document.getElementById("difficulty").addEventListener("click", (e) => {
        let id_difficulty = (parseInt(e.target.dataset.difficulty) + 1) == Constants.DIFFICULTY.length ? 0 : parseInt(e.target.dataset.difficulty) + 1;
        game.difficulty = Constants.DIFFICULTY[id_difficulty];
        e.target.dataset.difficulty = id_difficulty;
        e.target.innerHTML = "DIFFICULTY: " + game.difficulty;
        setSelected(e.target);
    });

    window.addEventListener("keyup", (e) => {
        if (e.type == "keyup") {
            var actual = buttons.getElementsByClassName("purple-with-blue")[0];
            if (e.keyCode == 38)(setSelected(actual.previousElementSibling ?? buttons.lastElementChild));
            else if (e.keyCode == 40)(setSelected(actual.nextElementSibling ?? buttons.firstElementChild))
        }
    });


    document.getElementById("start_game").addEventListener("click", () => game.start());

}


function setSelected(actual) {
    console.log(actual);
    Array.from(document.querySelectorAll(".buttons a")).forEach(b => b.classList.remove("purple-with-blue"));
    actual.classList.add("purple-with-blue");
}