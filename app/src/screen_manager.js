import {
    startForm
} from "./controllers/startForm.js";
import {
    showLoader
} from "./controllers/loader.js";
import {
    _showGame
} from "./controllers/gameController.js";

export class ScreenManager {
    static showStartForm() {
        $('body').load('./templates/startForm.html', startForm);
    }

    static showLoader() {
        $('body').load('./templates/loader.html', showLoader);
    }

    static showGame() {
        $('body').load('./templates/game.html', _showGame);
    }

}