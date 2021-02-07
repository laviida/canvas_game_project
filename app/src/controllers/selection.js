import { ScreenManager } from "../managers/screen_manager.js";
export function _showMapSelection() {
    var game = window.game;
    Array.from(document.getElementById("map_selector").getElementsByClassName("preview_map")).forEach(map => {
        let func = (e) => {
            game.currentMap = game.mapManager.getMap(e.target.id);
            map.removeEventListener("click", func);
            ScreenManager.showGame();
            setTimeout(() => window.game.start(), 50);
        }
        map.addEventListener("click", func, {
            once: true
        });
    });
}