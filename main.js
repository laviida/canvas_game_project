window.addEventListener("load", () => {
    Splitting();
    setTimeout(() => {
        var game = new Game(Game.GAMEMODE.ARCADE);
        game.initialize();
        document.getElementById("loader").remove();
    }, 3000);

});