class PowerUp {
    constructor(parent) {
        this.id = parent.id;
        this.x = parent.x;
        this.y = parent.y;
        this.w = parent.w;
        this.h = parent.h;
        this.v = 0;
        this.game = parent.game;
        this.eventName = parent.pup.name;
        this.texture = parent.texturePowerUp;
        this.show = false;
        this.die = false;
    }

    start() {
        this.show = true;
        this.v = 3;
    }

    move() {
        if (this.y + this.h >= this.game.metrics.height + this.game.metrics.top) this.die = true;
        else if (this.y + this.h + this.v >= this.game.player.y &&
            this.x + this.w > this.game.player.x &&
            this.x < this.game.player.x + this.game.player.w) { this.game.startEvent(this.eventName); this.die = true }
        this.y += this.v;
    }

    update() {
        if (this.show) {
            this.draw();
            this.move();
        }
    }

    draw() {
        this.game.ctx.drawImage(this.texture, this.x, this.y, this.w, this.h);
    }

}