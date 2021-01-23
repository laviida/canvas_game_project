class Game {
    constructor(canvasElement) {
        this.canvasElement = canvasElement;
        this.ctx = null;
        this.metrics = null;
        this.player = null;
        this.balls = [];// id = 1; main Ball 
    }

    initialize() {
        this.ctx = this.canvasElement.getContext("2d");
        this.metrics = this.canvasElement.getBoundingClientRect();
        this.paintBackground("#000");
        this.player = new Player((this.metrics.width / 2) - 50, this.metrics.height * 0.9, 100, 20, 5, "#fff", "#ff00ff", this);
        this.balls.push(new Ball(1, 100, 50, 10, "#fff", this));
        this.balls.forEach(ball => ball.initialize());
        this.player.initialize();
        setInterval(() => this.update(), 10);
    }


    update() {
        this.clear();
        this.paintBackground("#000");
        this.player.update();
        this.balls.forEach(ball => ball.update());
    }


    paintBackground(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
}