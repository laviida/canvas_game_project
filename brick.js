class Brick {
    constructor(id, x, y, w, h, die = false, texture, game, power, brdcolor) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.game = game;
        this.texture = TextureManager.getTexture(texture, this.game.textures);
        this.die = die;
        this.power = power;
        this.brdcolor = brdcolor;
    }

    initialize() {
        this.game.ctx.drawImage(this.texture, this.x, this.y, this.w, this.h);
    }

    draw() {
        this.game.ctx.drawImage(this.texture, this.x, this.y, this.w, this.h);
        if (this.power) {
            this.game.ctx.strokeStyle = this.brdcolor;
            this.game.ctx.lineWidth = 3;
            this.game.ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
    }

    collide() {
        if (TextureManager.getBrickState(this.texture.id) == TextureManager.BRICK_STATE.NORMAL) this.setTexture(TextureManager.getCrackedTextureId(this.texture.id));
        else if (TextureManager.getBrickState(this.texture.id) == TextureManager.BRICK_STATE.CRACKED) this.die = true;

    }

    setTexture(texture) {
        this.texture = TextureManager.getTexture(texture, this.game.textures);
    }

    update() {
        this.draw();
    }
}