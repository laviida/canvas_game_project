class Game {
    constructor() {
        this.canvasElement = this.createCanvasElement();
        this.ctx = null;
        this.metrics = null;
        this.player = null;
        this.balls = [];// id = 1; main Ball 
        this.bricks = [];
        this.textures = {};
    }

    initialize() {
        TextureManager.loadTextures().then(textures => {
            this.textures = textures;
            this.ctx = this.canvasElement.getContext("2d");
            this.metrics = this.canvasElement.getBoundingClientRect();
            this.paintBackground("#000");
            this.player = new Player((this.metrics.width / 2) - 50, this.metrics.height * 0.9, 100, 20, 5, "#fff", "#ff00ff", this);
            this.balls.push(new Ball(1, (this.metrics.width / 2) - 50, this.metrics.height * 0.7, 10, "#fff", this));
            this.balls.forEach(ball => ball.initialize());
            this.player.initialize();

            for (let index1 = 0; index1 < Math.floor((this.metrics.height * 0.5) / 20); index1++) {
                for (let index = 0; index < Math.floor(this.metrics.width / 90); index++) {
                    this.bricks.push(new Brick(index, (index * 80) + 40, (index1 * 20) + 40, 80, 20, TextureManager.BRICK_TEXTURE_SETS.purple.normal, this));
                    this.bricks.forEach(brick => brick.initialize());
                }
            }

            setInterval(() => this.update(), 10);
        });
    }

    createCanvasElement() {
        let canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = window.innerWidth * 0.999;
        canvas.height = window.innerHeight;
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