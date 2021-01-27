class PowerUp {
    constructor(parent) {
        this.id = parent.id;
        this.x = parent.x;
        this.y = parent.y;
        this.w = parent.w;
        this.h = parent.h;
        this.v = 0;
        this.game = parent.game;
        this.texture = this.getRandomTexture();
        this.brickColor = "#0f0";
        this.show = false;
        this.die = false;
    }

    start() {
        this.show = true;
        this.v = 3;
        console.log(this.texture);
    }

    move() {
        if (this.y >= this.game.h) this.die = false;
        this.y += this.v;
    }

    getRandomTexture() {
        var id_texture = Math.round((Math.random() * 10)) + 41;
        //return TextureManager.getTexture(id_texture, this.game.textures);
        return TextureManager.POWER_TEXTURES.slow;
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