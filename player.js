class Player {
    constructor(x, y, w, h, r, bgcolor, brdcolor, game) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.r = r;
        this.vx = 0;
        this.v = 5;
        this.bgcolor = bgcolor;
        this.brdcolor = brdcolor;
        this.game = game;
        this.moves = [false, false]; // left - right
    }

    initialize() {
        window.addEventListener("keydown", (e) => this.detectMove(e));
        window.addEventListener("keyup", (e) => this.removeMove(e));

        this.draw();
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
}