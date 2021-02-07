import { ScreenManager } from "../managers/screen_manager.js";
export function _showMenuHud() {
    var game = window.game;
    var pause = document.getElementById("pause");
    var settings = document.getElementById("settings");
    var menu = document.getElementById("menu");
    var camera = document.getElementById("camera");
    var user = document.getElementById("user");

    window.addEventListener("keypress", (e) => {
        if (e.key == " ") game.move();
    }, { once: true });

    window.addEventListener("keyup", (e) => {
        if (e.key == "Escape") changePaused(pause);
    });

    pause.addEventListener("click", (e) => changePaused(e.target));

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

function changePaused(e) {
    if (e.classList.contains("paused")) {
        window.game.move();
        e.style.background = "url('./img/form_icons/pause.png')";
    } else {
        window.game.pause();
        e.style.background = "url('./img/form_icons/pause_filled.png')";
    }
    e.classList.toggle("paused");
    e.style.backgroundRepeat = "no-repeat";
    e.style.backgroundPosition = "center";
    e.style.backgroundSize = "cover";
}



