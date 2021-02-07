import { Game } from './game.js';
import { ScreenManager } from "./managers/screen_manager.js";


window.addEventListener("load", async () => {
    ScreenManager.showLoader();
    window.game = new Game();
    await window.game.initialize();
    ScreenManager.showStartForm();
});