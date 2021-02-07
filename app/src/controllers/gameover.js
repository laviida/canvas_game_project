export function _gameover() {
    document.getElementsByClassName("game_over_quote")[0].innerHTML = "&#8220;" + window.game.quotes.random() + "&#8221";
}