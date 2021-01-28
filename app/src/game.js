class Game {
    static GAMEMODE = {
        ARCADE: "ARCADE",
        SELECTION: "SELECTION"
    }
    constructor(gamemode) {
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
        this.powers = [];
        this.textures = {};
        this.mapManager = new MapManager(this);
        this.paused = false;
        this.pause_element = document.getElementById("pause");
        this.settings_element = document.getElementById("settings");
        this.settings_opened = false;
        this.menu_element = document.getElementById("menu");
        this.camera_element = document.getElementById("camera");
        this.user_element = document.getElementById("user");
        this.placeholder_start = document.getElementById("placeholder_start");
        this.form_account = document.getElementById("form_account");
        this.save_settings = document.getElementById("save_settings");
        this.reset_settings = document.getElementById("reset_settings");
        this.gameover_wrapper = document.getElementById("gameover_wrapper");
        this.initialSettingsBall = {
            bgcolor: "#fff",
            brdcolor: "#ff00ff"
        };
        this.brdColorPickerBall = null;
        this.bgColorPickerBall = null;
        this.placeholder = false;
        this.lives = 3;
        this.gamemode = gamemode;
        this.mapFinishedEvent = new Event("map_finished");
        this.currentMap = null;
        this.loop = null;
        this.loader = document.getElementById("loader");
        this.showingStartForm = true;
    }

    initialize() {
        Array.prototype.random = function () {
            return this[Math.floor((Math.random() * this.length))]
        }
        Number.prototype.map = function (x1, y1, x2, y2) {
            return (this - x1) * (y2 - x2) / (y1 - x1) + x2
        };

        TextureManager.loadTextures().then(textures => {
            this.currentMap = this.mapManager.getRandomMap();
            document.getElementById("game").style.display = "block";
            this.textures = textures;
            this.ctx = this.canvasElement.getContext("2d");
            this.metrics = this.canvasElement.getBoundingClientRect();
            this.paintBackground("#000");
            this.player = new Player((this.metrics.width / 2) - (this.window_metrics.width * 0.15) / 2, this.metrics.height * 0.9, this.window_metrics.width * 0.15, this.window_metrics.height * 0.03, 5, null, null, this);
            this.balls.push(new Ball(1, (this.metrics.width / 2) - (this.window_metrics.width * 0.009) / 2, this.player.y - this.window_metrics.width * 0.009, this.window_metrics.width * 0.009, this.initialSettingsBall.bgcolor, this));
            this.balls.forEach(ball => ball.initialize());
            this.player.initialize();

            this.ballsColorPickersListeners();

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
            });

            this.user_element.addEventListener("click", () => this.showSettings());
            document.getElementById("start_game").addEventListener("click", () => this.start());
            document.getElementById("gamemode").addEventListener("click", (e) => {
                e.target.innerHTML = e.target.innerHTML == "GAMEMODE: " + Game.GAMEMODE.ARCADE ? "GAMEMODE: " + Game.GAMEMODE.SELECTION : "GAMEMODE: " + Game.GAMEMODE.ARCADE
                e.target.previousElementSibling.classList.remove("purple-with-blue");
                e.target.nextElementSibling.classList.remove("purple-with-blue");
                e.target.classList.add("purple-with-blue");
            });

            this.save_settings.addEventListener("click", () => this.saveSettings());
            this.reset_settings.addEventListener("click", () => this.resetSettings());
            this.finishHandler();
            this.loader.remove();
            this.showStartForm();
        });
    }

    start() {
        this.hideStartForm();
        if (this.gamemode == Game.GAMEMODE.ARCADE) this.currentMap = this.mapManager.getRandomMap();
        this.showPlaceholderStart();
        this.showHud();
        this.updateLives();
        this.createMap();
        this.loop = setInterval(() => this.update(), 10);
    }

    finishHandler() {
        this.mapFinishedEvent.initEvent("map_finished", true, true);
        document.addEventListener("map_finished", this.finish, {
            once: true
        });
    }

    finish() {
        //mostrar win form next?
        this.start();

    }

    showHud() {
        document.getElementById("hud").style.display = "block";
    }

    hideHud() {
        document.getElementById("hud").style.display = "none";
    }

    die() {
        this.pause({
            type: "click"
        });
        this.pause_element.style.background = "url('./img/form_icons/pause.png')";
        this.pause_element.style.backgroundRepeat = "no-repeat";
        this.pause_element.style.backgroundPosition = "center";
        this.pause_element.style.backgroundSize = "cover";
        this.placeholder = false;
        this.showPlaceholderStart();
        this.lives--;
        if (this.lives <= 0) this.gameOver()
        else {
            this.updateLives();
            this.resetGame();
        }
    }

    gameOver() {
        this.gameover_wrapper.style.display = "block";
        clearInterval(this.loop);
        this.hideHud();
        this.hidePlaceholderStart();
        this.hideSettings();
        this.clear();
    }

    resetGame() {
        this.player.x = (this.metrics.width / 2) - (this.window_metrics.width * 0.15) / 2;
        this.balls.forEach(ball => {
            ball.x = (this.metrics.width / 2) - (this.window_metrics.width * 0.009) / 2;
            ball.y = this.player.y - this.window_metrics.width * 0.009;
        });
    }

    startEvent(name) {
        switch (name) {
            case "slow":
                this.balls.forEach(ball => ball.slow());
                setTimeout(() => this.balls.forEach(ball => ball.normal()), 5000);
                break;
            case "shrink":
                this.player.shrink();
                setTimeout(() => this.player.normal(), 8000);
                break;
            case "stretch":
                this.player.stretch();
                setTimeout(() => this.player.normal(), 8000);
                break;
            case "lava":
                this.balls.forEach(ball => ball.lava());
                setTimeout(() => this.balls.forEach(ball => ball.normal()), 10000);
                break;
            case "invisible":
                this.player.invisible();
                setTimeout(() => this.player.normal(), 5000);
                break;
            case "fast":
                this.balls.forEach(ball => ball.fast());
                setTimeout(() => this.balls.forEach(ball => ball.fast()), 5000);
                break;
            default:
                break;
        }

    }

    updateLives() {
        document.getElementById("lives").innerHTML = this.lives;
    }

    resetSettings() {
        this.player.bgColorPicker.reset();
        this.player.brdColorPicker.reset()

        this.bgColorPickerBall.reset();
        this.brdColorPickerBall.reset();
    }

    saveSettings() {
        this.hideSettings();
    }

    showStartForm() {
        this.showingStartForm = true;
        $("#myModal").modal({
            backdrop: "static"
        });
    }

    hideStartForm() {
        this.showingStartForm = false;
        $('#myModal').modal('hide');
    }
    showSettings() {
        if (!this.paused)
            this.pause({
                type: "click"
            });

        document.getElementsByClassName("accountFormWrapper")[0].style.display = "block";
        this.form_account.style.display = "block";
    }

    hideSettings() {
        document.getElementsByClassName("accountFormWrapper")[0].style.display = "none";
        this.form_account.style.display = "none";
    }

    showPlaceholderStart() {
        this.placeholder_start = document.getElementById("placeholder_start");
        document.getElementById("placeholder_start").style.display = "block";
        window.addEventListener("keypress", (e) => {
            if (e.keyCode == 32 && !this.placeholder) {
                this.placeholder = true;
                this.paused = false;
                this.hidePlaceholderStart();
                document.getElementById("pause").style.display = "block";
                document.getElementById("menu").style.display = "block";
                document.getElementById("settings").style.display = "block";
                this.player.start();
                this.balls.forEach(ball => ball.start());
            };
        });
    }

    hidePlaceholderStart() {
        this.placeholder_start.style.display = "none";
    }

    createMap() {
        this.mapManager.drawMap(this.currentMap);
    }

    createCanvasElement() {
        let canvas = document.createElement("canvas");
        canvas.id = "canvas";
        canvas.width = this.window_metrics.width * 0.999;
        canvas.height = this.window_metrics.height;
        document.getElementById("game").appendChild(canvas);

        return document.getElementById("canvas");
    }

    update() {
        this.clear();
        this.paintBackground("#000");
        this.player.update();
        this.balls.forEach(ball => ball.update());
        this.bricks.forEach(brick => brick.update());
        this.bricks = this.bricks.filter(brick => !brick.die);
        this.powers.forEach(p => p.update());
        this.powers = this.powers.filter(p => !p.die);
        if (this.bricks.length == 0) document.dispatchEvent(this.mapFinishedEvent);

    }

    paintBackground(color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }

    pause(e) {
        if ((e.type == "keyup" && e.key == "Escape") || e.type == "click") {
            this.paused = !this.paused;
            if (this.paused) {
                this.player.pause();
                this.balls.forEach(ball => ball.pause());
                this.pause_element.style.background = "url('./img/form_icons/pause_filled.png')";
            } else {
                this.player.start();
                this.balls.forEach(ball => ball.start());
                this.pause_element.style.background = "url('./img/form_icons/pause.png')";
            }
            this.pause_element.style.backgroundRepeat = "no-repeat";
            this.pause_element.style.backgroundPosition = "center";
            this.pause_element.style.backgroundSize = "cover";
        } else if (e.type == "keyup" && this.showingStartForm) {
            var buttons = document.querySelector(".buttons");
            var actual = document.querySelector("[selected]");
            if (e.keyCode == 13) {
                if (Array.from(buttons.children).indexOf(actual) == 0) this.start();
                else if (Array.from(buttons.children).indexOf(actual) == 1) actual.innerHTML = `GAMEMODE: ${actual.innerHTML == "GAMEMODE: " + Game.GAMEMODE.ARCADE ? Game.GAMEMODE.SELECTION : Game.GAMEMODE.ARCADE}`;
                else console.log("in production difficulty");
            } else {

                if (e.keyCode == 38) (actual.previousElementSibling ?? buttons.lastElementChild).setAttribute("selected", "");
                else if (e.keyCode == 40) (actual.nextElementSibling ?? buttons.firstElementChild).setAttribute("selected", "");
                actual.removeAttribute("selected");
                actual.classList.remove("purple-with-blue");
                document.querySelector("[selected]").classList.add("purple-with-blue");
            }
        }
    }

    ballsColorPickersListeners() {

        this.bgColorPickerBall = new iro.ColorPicker(".colorPicker3", {
            width: this.window_metrics.width * 0.05,
            color: this.initialSettingsBall.bgcolor,
            borderWidth: 1,
            borderColor: "#fff",
            layoutDirection: "horizontal"
        });

        this.bgColorPickerBall.on(["color:init", "color:change"], (color) => {
            this.balls.forEach(ball => {
                ball.bgcolor = color.hexString;
                ball.initSettings.bgcolor = color.hexString;

            });

        });

        this.brdColorPickerBall = new iro.ColorPicker(".colorPicker4", {
            width: this.window_metrics.width * 0.05,
            color: this.initialSettingsBall.brdcolor,
            borderWidth: 1,
            borderColor: "#fff",
            layoutDirection: "horizontal"
        });

        this.brdColorPickerBall.on(["color:init", "color:change"], (color) => {
            this.balls.forEach(ball => {
                ball.brdcolor = color.hexString;
                ball.initSettings.brdcolor = color.hexString;
            });
        });
    }

}