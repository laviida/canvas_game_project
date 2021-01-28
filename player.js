class Player {
    constructor(x, y, w, h, r, bgcolor, brdcolor, game) {
        this.initialSettings = {
            bgcolor: "#fff",
            brdcolor: "#ff00ff"
        }
        this.x = x;
        this.y = y;
        this.w = w;
        this.first_w = w;
        this.h = h;
        this.r = r;
        this.vx = 0;
        this.v = 0;
        this.bgcolor = null == bgcolor ? this.initialSettings.bgcolor : bgcolor;
        this.brdcolor = null == brdcolor ? this.initialSettings.brdcolor : brdcolor;;
        this.game = game;
        this.moves = [false, false]; // left - right
        this.bgColorPicker = null;
        this.brdColorPicker = null;
        this._invisible = false;
    }

    initialize() {
        window.addEventListener("keydown", (e) => this.detectMove(e));
        window.addEventListener("keyup", (e) => this.removeMove(e));
        this.settingsListeners();
    }

    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.moveTo(this.x + this.r, this.y);
        this.game.ctx.lineTo(this.x + this.w - this.r, this.y);
        this.game.ctx.quadraticCurveTo(this.x + this.w, this.y, this.x + this.w, this.y + this.r);
        this.game.ctx.lineTo(this.x + this.w, this.y + this.h - this.r);
        this.game.ctx.quadraticCurveTo(this.x + this.w, this.y + this.h, this.x + this.w - this.r, this.y + this.h);
        this.game.ctx.lineTo(this.x + this.r, this.y + this.h);
        this.game.ctx.quadraticCurveTo(this.x, this.y + this.h, this.x, this.y + this.h - this.r);
        this.game.ctx.lineTo(this.x, this.y + this.r);
        this.game.ctx.quadraticCurveTo(this.x, this.y, this.x + this.r, this.y);
        this.game.ctx.closePath();

        this.game.ctx.fillStyle = this.bgcolor;
        this.game.ctx.fill();
        this.game.ctx.lineWidth = 2;
        this.game.ctx.strokeStyle = this.brdcolor;
        this.game.ctx.stroke();
    }

    move() {
        this.moves[0] ? this.vx = -this.v : this.moves[1] ? this.vx = this.v : this.vx = 0;
        if ((this.x + this.w >= this.game.metrics.width && !this.moves[0]) || (this.x <= 0 && !this.moves[1]))
            this.vx = 0;

        this.x += this.vx;
    }

    update() {
        this.draw();
        this.move();
    }

    detectMove(ev) {
        var e = window.event || ev;
        this.moves = [e.keyCode == 37, e.keyCode == 39]
    }

    removeMove(ev) {
        var e = window.event || ev;
        if (e.keyCode == 37 || e.keyCode == 39) this.moves = [false, false];
    }

    start() {
        this.v = 5;
    }

    pause() {
        this.v = 0;
    }

    settingsListeners() {

        this.bgColorPicker = new iro.ColorPicker(".colorPicker", {
            width: this.game.window_metrics.width * 0.05,
            color: this.initialSettings.bgcolor,
            borderWidth: 1,
            borderColor: "#fff",
            layoutDirection: "horizontal"
        });

        this.bgColorPicker.on(["color:init", "color:change"], (color) => {
            this.initialSettings.bgcolor = color.hexString;
            this.bgcolor = color.hexString;
        });

        this.brdColorPicker = new iro.ColorPicker(".colorPicker2", {
            width: this.game.window_metrics.width * 0.05,
            color: this.initialSettings.brdcolor,
            borderWidth: 1,
            borderColor: "#fff",
            layoutDirection: "horizontal"
        });

        this.brdColorPicker.on(["color:init", "color:change"], (color) => {
            this.initialSettings.brdcolor = color.hexString;
            this.brdcolor = color.hexString;
        });
    }
    stretch() {
        this.w = this.w * 1.3;
    }

    shrink() {
        this.w = this.w * 0.7;
    }

    normal() {
        this.w = this.first_w;
        this._invisible = false;
        this.bgcolor = this.initialSettings.bgcolor;
        this.brdcolor = this.initialSettings.brdcolor;
    }

    invisible() {
        this._invisible = true;
        this.bgcolor = "#000";
        this.brdcolor = "#000";
    }

}