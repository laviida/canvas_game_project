import { ScreenManager } from "../managers/screen_manager.js";
import { STATE } from "../constants/constants.js";

export function _showMenuHud() {
    var game = window.game;
    var settings = document.getElementById("settings");
    var menu = document.getElementById("menu");
    var camera = document.getElementById("camera");
    var user = document.getElementById("user");

    window.addEventListener("keypress", (e) => {
        if (e.key == " ") game.move();
    }, { once: true });

    window.addEventListener("keyup", (e) => { if (e.key == "Escape") game.state === STATE.RUNNING ? game.pause() : game.move() });


    settings.addEventListener("click", (e) => {
        e.target.classList.toggle("settings_animation");
        menu.classList.toggle("menu_animation");
        var open = menu.classList.contains("menu_animation") ? "block" : "none";
        Array.from(menu.children).forEach(x => x.style.display = open);
    });

    camera.addEventListener("click", () => {
        var link = document.createElement('a');
        link.setAttribute('download', 'canvas.png');
        link.setAttribute('href', game.canvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        link.click();
    });

    user.addEventListener("click", () => {
        ScreenManager.showSettings();
    });
    game.updateLives();
}



