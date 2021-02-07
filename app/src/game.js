import { TextureManager } from "./managers/textures.js";
import { Constants } from "./utils/constants.js";
import { Ball } from "./models/ball.js";
import { Player } from "./models/player.js";
import { ScreenManager } from "./managers/screen_manager.js";
import { MapManager } from "./managers/map.js";
export class Game {

    constructor() {
        this.window_metrics = { width: window.innerWidth, height: window.innerHeight }
        this.canvasElement = null;
        this.ctx = null;
        this.metrics = null;
        this.player = null;
        this.balls = []; // id = 1; main Ball 
        this.bricks = [];
        this.powers = [];
        this.textures = {};
        this.textureManager = new TextureManager();
        this.mapManager = null;
        this.brdColorPickerBall = null;
        this.bgColorPickerBall = null;
        this.bgColorPickerPlayer = null;
        this.brdColorPickerPlayer = null;
        this.lives = 3;
        this.gamemode = Constants.gamemode().ARCADE;
        this.difficulty = Constants.difficulty()[0];
        this.mapFinishedEvent = new Event("map_finished");
        this.currentMap = null;
        this.loop = null;
        this.quotes = [];
        this.Ball_INIT_SETTINGS = { bgcolor: "#fff", brdcolor: "#ff00ff" }
        this.Ball_CURRENT_SETTINGS = { bgcolor: "#fff", brdcolor: "#ff00ff" }
    }

    initialize() {
        return new Promise(async (resolve) => {
            Array.prototype.random = function () {
                return this[Math.floor((Math.random() * this.length))]
            }
            Number.prototype.map = function (x1, y1, x2, y2) {
                return (this - x1) * (y2 - x2) / (y1 - x1) + x2
            };

            var res = await fetch("./json/data.json");
            this.quotes = await res.json();
            this.textures = await this.textureManager.loadTextures();

            this.mapManager = new MapManager(this);
            this.finishHandler();
            resolve();
        });
    }

    start() {
        this.canvasElement = document.getElementById("canvas");
        this.ctx = this.canvasElement.getContext("2d");
        this.metrics = this.canvasElement.getBoundingClientRect();
        this.paintBackground("#000");
        this.player = new Player((this.metrics.width / 2) - (this.window_metrics.width * 0.15) / 2, this.metrics.height * 0.9, this.window_metrics.width * 0.15, this.window_metrics.height * 0.03, 5, this);
        this.balls = [];
        this.balls.push(new Ball(1, (this.metrics.width / 2) - (this.window_metrics.width * 0.009) / 2, this.player.y - this.window_metrics.width * 0.009, this.window_metrics.width * 0.009, this));
        this.balls.forEach(ball => ball.initialize());
        this.player.initialize();

        if (this.gamemode == Constants.gamemode().ARCADE) this.currentMap = this.mapManager.getRandomMap();
        ScreenManager.showMenu_Hud();
        this.updateLives();
        this.createMap();
        this.loop = setInterval(() => this.update(), 10);

    }

    move() {
        ScreenManager.hidePlaceholder();
        this.player.start();
        this.balls.forEach(ball => ball.start());
    }

    pause() {
        this.player.pause();
        this.balls.forEach(ball => ball.pause());
    }


    finishHandler() {
        this.mapFinishedEvent.initEvent("map_finished", true, true);
        document.addEventListener("map_finished", () => this.finish(), {
            once: true
        });
    }

    finish() {
        clearInterval(this.loop);
        this.clear();
        ScreenManager.showGame();
        if (this.gamemode == Constants.gamemode().SELECTION) ScreenManager.showMapSelection();
        else setTimeout(() => this.start(), 50);
    }

    die() {
        this.pause();
        ScreenManager.showMenu_Hud();
        this.lives = this.lives - 1;
        if (this.lives <= 0) this.gameOver();
        else {
            this.updateLives();
            this.resetGame();
        }
    }

    gameOver() {
        ScreenManager.showGameOver();
        clearInterval(this.loop);
        this.clear();
    }

    resetGame() {
        this.player.x = (this.metrics.width / 2) - (this.window_metrics.width * 0.15) / 2;
        this.balls.forEach(ball => {
            ball.x = (this.metrics.width / 2) - (this.window_metrics.width * 0.009) / 2;
            ball.y = this.player.y - this.window_metrics.width * 0.009;
        });
        this.pause();
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
        this.lives > 0 ? setTimeout(() => document.getElementById("lives").innerHTML = this.lives, 50) : this.lives;
    }

    resetSettings() {
        this.player.reset();
        this.balls.forEach(b => b.reset());
        ScreenManager.showMenu_Hud();
    }

    createMap() {
        this.mapManager.drawMap(this.currentMap);
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

    ballsColorPickersListeners() {

        this.bgColorPickerBall = new iro.ColorPicker(".colorPicker3", {
            width: this.window_metrics.width * 0.05,
            color: this.game.Ball_CURRENT_SETTINGS.bgcolor,
            borderWidth: 1,
            borderColor: "#fff",
            layoutDirection: "horizontal"
        });

        this.bgColorPickerBall.on(["color:init", "color:change"], (color) => {
            this.balls.forEach(ball => {
                ball.bgcolor = color.hexString;
                this.game.Ball_CURRENT_SETTINGS.bgcolor = color.hexString;
            });

        });

        this.brdColorPickerBall = new iro.ColorPicker(".colorPicker4", {
            width: this.window_metrics.width * 0.05,
            color: this.game.Ball_CURRENT_SETTINGS.brdcolor,
            borderWidth: 1,
            borderColor: "#fff",
            layoutDirection: "horizontal"
        });

        this.brdColorPickerBall.on(["color:init", "color:change"], (color) => {
            this.balls.forEach(ball => {
                ball.brdcolor = color.hexString;
                this.game.Ball_CURRENT_SETTINGS.brdcolor = color.hexString;
            });
        });
    }

    playerColorPickerListeners() {

        this.bgColorPickerPlayer = new iro.ColorPicker(".colorPicker", {
            width: this.window_metrics.width * 0.05,
            color: this.player.bgcolor,
            borderWidth: 1,
            borderColor: "#fff",
            layoutDirection: "horizontal"
        });

        this.bgColorPickerPlayer.on(["color:init", "color:change"], (color) => {
            this.player.currentSettings.bgcolor = color.hexString;
            this.player.bgcolor = color.hexString;
        });

        this.brdColorPickerPlayer = new iro.ColorPicker(".colorPicker2", {
            width: this.window_metrics.width * 0.05,
            color: this.player.brdcolor,
            borderWidth: 1,
            borderColor: "#fff",
            layoutDirection: "horizontal"
        });

        this.brdColorPickerPlayer.on(["color:init", "color:change"], (color) => {
            this.player.currentSettings.brdcolor = color.hexString;
            this.player.brdcolor = color.hexString;
        });
    }

}
