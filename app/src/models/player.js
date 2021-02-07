export class Player {
    constructor(x, y, w, h, r, game) {
        this.initialSettings = { bgcolor: "#fff", brdcolor: "#ff00ff" }
        this.currentSettings = { bgcolor: "#fff", brdcolor: "#ff00ff" }
        this.x = x;
        this.y = y;
        this.w = w;
        this.first_w = w;
        this.h = h;
        this.r = r;
        this.vx = 0;
        this.v = 0;
        this.bgcolor = this.currentSettings.bgcolor;
        this.brdcolor = this.currentSettings.brdcolor;
        this.game = game;
        this.moves = [false, false]; // left - right
        this._invisible = false;
    }

    initialize() {
        window.addEventListener("keydown", (e) => this.detectMove(e));
        window.addEventListener("keyup", (e) => this.removeMove(e));
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
        if (e.keyCode == 37) this.moves[0] = false;
        if (e.keyCode == 39) this.moves[1] = false;
    }

    start() {
        this.v = 5;
    }

    pause() {
        this.v = 0;
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
        this.bgcolor = this.currentSettings.bgcolor;
        this.brdcolor = this.currentSettings.brdcolor;
    }

    invisible() {
        this._invisible = true;
        this.bgcolor = "#000";
        this.brdcolor = "#000";
    }

    reset() {
        this.bgcolor = this.initialSettings.bgcolor;
        this.brdcolor = this.initialSettings.brdcolor;
        this.currentSettings.bgcolor = this.initialSettings.bgcolor;
        this.currentSettings.brdcolor = this.initialSettings.brdcolor;
    }

}