import { startForm } from "../controllers/startForm.js";
import { showLoader } from "../controllers/loader.js";
import { _showGame } from "../controllers/gameController.js";
import { _showMapSelection } from "../controllers/selection.js";
import { _showSettings } from "../controllers/settings.js";
import { _showMenuHud } from "../controllers/menuhud.js";
import { _gameover } from "../controllers/gameover.js";

export class ScreenManager {
    static showStartForm() {
        $('#forms').load('./templates/startForm.html', startForm);
    }

    static hideStartForm() {
        $('#myModal').modal('hide');
    }

    static showLoader() {
        $('#forms').load('./templates/loader.html', showLoader);
    }

    static showGame() {
        $('#game').load('./templates/game.html', _showGame);
    }

    static showMapSelection() {
        $('#forms').load('./templates/selection.html', _showMapSelection);
    }
    static showSettings() {
        $('#forms').load('./templates/settings.html', _showSettings);
    }

    static showMenu_Hud() {
        $('#forms').load('./templates/menu_hud.html', _showMenuHud);
    }

    static hidePlaceholder() {
        $('#placeholder_start').hide();
    }

    static showGameOver() {
        $('#forms').load('./templates/gameover.html', _gameover);
    }
}