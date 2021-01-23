class Ball {
    constructor(id, x, y, r, bgcolor, game) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = 0;
        this.vy = 0;
        this.v = 3;
        this.bgcolor = bgcolor;
        this.game = game;
    }

    initialize() {
        this.vx = Math.random() > 0.5 ? 1 : -1;
        this.vy = Math.random() > 0.5 ? 1 : -1;
    }

    draw() {
        this.game.ctx.beginPath();
        this.game.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.game.ctx.closePath();

        this.game.ctx.fillStyle = this.bgcolor;
        this.game.ctx.fill();
        //this.game.ctx.stroke();
    }

    move() {
        // game collisions
        if (this.x + this.r >= this.game.metrics.width) this.vx *= -1;
        if (this.x <= this.game.metrics.left) this.vx *= -1;
        if (this.y + this.r >= this.game.metrics.height + this.game.metrics.top) this.vy *= -1;
        if (this.y <= this.game.metrics.top) this.vy *= -1;

        // player collisions
        // V
        if (this.y + this.r >= this.game.player.y && this.x >= this.game.player.x && this.x + this.r <= this.game.player.x + this.game.player.w) this.vy *= -1;
        /*  else
              //H
              if (this.x + this.r >= this.game.player.x && this.y + this.r >= this.game.player.y) this.vx *= -1;
              else if (this.x <= this.game.player.x + this.game.player.w && this.y + this.r >= this.game.player.y) this.vx *= -1;
  */
        // bricks collisions
        this.game.bricks.forEach(brick => {
            if ((this.y <= brick.y + brick.h + 10 && this.x >= brick.x && this.x + this.r <= brick.x + brick.w) ||
                (this.y + this.h >= brick.y + 10 && this.x >= brick.x && this.x + this.r <= brick.x + brick.w)) {
                this.vy *= -1;
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
}