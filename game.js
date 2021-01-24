class Game {
    constructor() {
        this.window_metrics = { width: window.innerWidth, height: window.innerHeight }
        this.canvasElement = this.createCanvasElement();
        this.ctx = null;
        this.metrics = null;
        this.player = null;
        this.balls = [];// id = 1; main Ball 
        this.bricks = [];
        this.textures = {};
        this.mapManager = new MapManager(this);
    }

    initialize() {
        TextureManager.loadTextures().then(textures => {
            this.textures = textures;
            this.ctx = this.canvasElement.getContext("2d");
            this.metrics = this.canvasElement.getBoundingClientRect();
            this.paintBackground("#000");
            this.player = new Player((this.metrics.width / 2) - 50, this.metrics.height * 0.9, Math.abs(this.window_metrics.width - this.window_metrics.height) * 0.15, Math.abs(this.window_metrics.width - this.window_metrics.height) * 0.027, 5, "#fff", "#ff00ff", this);
            this.balls.push(new Ball(1, (this.metrics.width / 2) - 50, this.metrics.height * 0.7, (Math.abs(this.window_metrics.width - this.window_metrics.height) * 0.01), "#fff", this));
            this.balls.forEach(ball => ball.initialize());
            this.player.initialize();

            this.createMap(MapManager.MAPS.alien);

            setInterval(() => this.update(), 10);
        });
    }

    createMap(map) {
        this.mapManager.drawMap(map);
    }

    createCanvasElement() {
        let canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = this.window_metrics.width * 0.999;
        canvas.height = this.window_metrics.height;
        document.body.appendChild(canvas);

        return document.getElementById("canvas");

    }


    update() {
        this.clear();
        this.paintBackground("#000");
        this.player.update();
        this.balls.forEach(ball => ball.update());
        this.bricks.forEach(brick => brick.update());
        this.bricks = this.bricks.filter(brick => !brick.die);

    }


    paintBackground(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
}