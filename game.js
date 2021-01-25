class Game {
    constructor() {
        this.window_metrics = {
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.canvasElement = this.createCanvasElement();
        this.ctx = null;
        this.metrics = null;
        this.player = null;
        this.balls = []; // id = 1; main Ball 
        this.bricks = [];
        this.textures = {};
        this.mapManager = new MapManager(this);
        this.paused = false;
        this.pause_element = document.getElementById("pause");
        this.settings_element = document.getElementById("settings");
        this.settings_opened = false;
        this.menu_element = document.getElementById("menu");
        this.camera_element = document.getElementById("camera");

    }

    initialize() {
        TextureManager.loadTextures().then(textures => {
            this.textures = textures;
            this.ctx = this.canvasElement.getContext("2d");
            this.metrics = this.canvasElement.getBoundingClientRect();
            this.paintBackground("#000");
            this.player = new Player((this.metrics.width / 2) - 50, this.metrics.height * 0.9, this.window_metrics.width * 0.15, this.window_metrics.height * 0.03, 5, "#fff", "#ff00ff", this);
            this.balls.push(new Ball(1, (this.metrics.width / 2) - 50, this.metrics.height * 0.7, this.window_metrics.width * 0.009, "#fff", this));
            this.balls.forEach(ball => ball.initialize());
            this.player.initialize();

            this.createMap(MapManager.MAPS.space);

            this.pause_element.addEventListener("click", (e) => this.pause(e));
            window.addEventListener("keyup", (e) => this.pause(e));

            this.settings_element.addEventListener("click", (e) => {
                this.settings_opened = !this.settings_opened;
                e.target.classList.toggle("settings_animation");
                this.menu_element.classList.toggle("menu_animation");
                Array.from(this.menu_element.children).forEach(x => x.style.display = this.settings_opened ? "block" : "none");
            });
            this.camera_element.addEventListener("click", () => {
                var link = document.createElement('a');
                link.setAttribute('download', 'canvas.png');
                link.setAttribute('href', this.canvasElement.toDataURL("image/png").replace("image/png", "image/octet-stream"));
                link.click();
            })


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

    open() {

    }

    pause(e) {
        if ((e.type == "keyup" && e.key == "Escape") || e.type == "click") {
            this.paused = !this.paused;
            if (this.paused) {
                this.player.pause();
                this.balls.forEach(ball => ball.pause());
                this.pause_element.style.background = "url('./powers/pause_filled.png')";
            } else {
                this.player.start();
                this.balls.forEach(ball => ball.start());
                this.pause_element.style.background = "url('./powers/pause.png')";
            }
            this.pause_element.style.backgroundRepeat = "no-repeat";
            this.pause_element.style.backgroundPosition = "center";
            this.pause_element.style.backgroundSize = "cover";
        }
    }
}