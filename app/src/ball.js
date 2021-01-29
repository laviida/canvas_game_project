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
        this.lava_ball = false;
        this.lavaSettings = {
            bgcolor: "#cf6010",
            brdcolor: "#cf1020"
        }
        this.initSettings = {
            bgcolor: this.bgcolor,
            brdcolor: this.brdcolor
        }
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
        this.game.ctx.lineWidth = 2;
        this.game.ctx.strokeStyle = this.brdcolor;
        this.game.ctx.stroke();
    }

    move() {
        // game collisions
        if (this.x + this.r >= this.game.metrics.width) this.vx = this.vx == 1 ? -1 : 1;
        if (this.x <= this.r) this.vx = this.vx == 1 ? -1 : 1;
        if (this.y + this.r >= this.game.metrics.height + this.game.metrics.top) {
            this.vy = this.vy == 1 ? -1 : 1;
            this.game.die();
        }
        if (this.y <= 0) this.vy = this.vy == 1 ? -1 : 1;

        // player collisions
        // V
        if (this.x + this.r > this.game.player.x &&
            this.x < this.game.player.x + this.game.player.w &&
            this.y + this.r + (this.vy * this.v) > this.game.player.y &&
            this.y + (this.vy * this.v) < this.game.player.y + this.game.player.h) {
            this.vy = (this.vy > 0 ? -1 : 1); //* Math.abs((this.x - this.game.player.x).map(0, this.game.player.w, -2, 2));
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
                this.y + (this.vy * this.v) < brick.y + brick.h + this.r) {
                if (!this.lava_ball) this.vy = this.vy > 0 ? -1 : 1;
                brick.collide(this.lava_ball);
                if (brick.die && brick.power) {
                    var powerup = new PowerUp(brick);
                    powerup.start();
                    this.game.powers.push(powerup);
                }
            }

            //H
            if (this.x + this.r + (this.vx * this.v) > brick.x &&
                this.x + (this.vx * this.v) < brick.x + brick.w &&
                this.y + this.r > brick.y &&
                this.y < brick.y + brick.h) {
                if (!this.lava_ball) this.vx = this.vx > 0 ? -1 : 1;
                brick.collide(this.lava_ball);
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
        this.normal();
    }

    pause() {
        this.v = 0;
    }

    slow() {
        this.v = 1.5;
    }

    fast() {
        this.v = 4.5;
    }

    normal() {
        this.lava_ball = false;
        this.v = 3;
        this.bgcolor = this.initSettings.bgcolor;
        this.brdcolor = this.initSettings.brdcolor;
    }

    lava() {
        this.lava_ball = true;
        this.bgcolor = this.lavaSettings.bgcolor;
        this.brdcolor = this.lavaSettings.brdcolor;
    }
}