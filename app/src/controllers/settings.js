import { ScreenManager } from "../managers/screen_manager.js";
export function _showSettings() {
    var game = window.game;
    game.playerColorPickerListeners();
    game.ballsColorPickersListeners();

    var save_settings = document.getElementById("save_settings");
    var reset_settings = document.getElementById("reset_settings");

    save_settings.addEventListener("click", () => ScreenManager.showMenu_Hud());
    reset_settings.addEventListener("click", () => game.resetSettings());
}
