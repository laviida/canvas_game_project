class Ball {
    constructor(id, x, y, r, bgcolor, game) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = 0;
        this.vy = 0;
        this.v = 0;
        this.bgcolor = bgcolor;
        this.brdcolor = "#fff";
        this.game = game;
    }

    initialize() {
        this.vx = Math.random() > 0.5 ? 1 : -1;
        this.vy = -1;
    }

    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.game.ctx.closePath();

        this.game.ctx.fillStyle = this.bgcolor;
        this.game.ctx.fill();
        this.game.ctx.strokeStyle = this.brdcolor;
        this.game.ctx.stroke();
    }

    move() {
        // game collisions
        if (this.x + this.r >= this.game.metrics.width) this.vx *= -1;
        if (this.x <= this.r) this.vx *= -1;
        if (this.y + this.r >= this.game.metrics.height + this.game.metrics.top) this.vy *= -1;
        if (this.y <= this.game.metrics.top) this.vy *= -1;

        // player collisions
        // V
        if (this.x + this.r > this.game.player.x &&
            this.x < this.game.player.x + this.game.player.w &&
            this.y + this.r + (this.vy * this.v) > this.game.player.y &&
            this.y + (this.vy * this.v) < this.game.player.y + this.game.player.h) {
            this.vy *= -1;
        }
        //H
        if (this.x + this.r + (this.vx * this.v) > this.game.player.x &&
            this.x + (this.vx * this.v) < this.game.player.x + this.game.player.w &&
            this.y + this.r > this.game.player.y &&
            this.y < this.game.player.y + this.game.player.h) {
            this.vx *= -1;
        }

        // bricks collisions
        this.game.bricks.forEach(brick => {
            //V
            if (this.x + this.r > brick.x &&
                this.x < brick.x + brick.w &&
                this.y + this.r + (this.vy * this.v) > brick.y &&
                this.y + (this.vy * this.v) < brick.y + brick.h) {
                this.vy *= -1;
                brick.collide();
            }

            //H
            if (this.x + this.r + (this.vx * this.v) > brick.x &&
                this.x + (this.vx * this.v) < brick.x + brick.w &&
                this.y + this.r > brick.y &&
                this.y < brick.y + brick.h) {
                this.vx *= -1;
                brick.collide();
            }
        });

        this.x += this.vx * this.v;
        this.y += this.vy * this.v;
    }

    update() {
        this.draw();
        this.move();
    }

    start() {
        this.v = 3;
    }

    pause() {
        this.v = 0;
    }

}