export function _showGame() {
    createCanvas();
}

function createCanvas() {
    let canvas = document.createElement("canvas");
    canvas.id = "canvas";
    canvas.width = window.innerWidth * 0.999;
    canvas.height = window.innerHeight;
    document.getElementById("game").appendChild(canvas);
}