window.addEventListener("load", () => {
    Splitting();
    setTimeout(() => {
        var game = new Game();
        game.initialize();
        document.getElementById("loader").remove();
    }, 5000);

});