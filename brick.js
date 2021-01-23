class Brick {
    constructor(id, x, y, w, h, texture, game) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.game = game;
        this.texture = TextureManager.getTexture(texture, this.game.textures);
        this.die = false;
    }

    initialize() {
        this.game.ctx.drawImage(this.texture, this.x, this.y, this.w, this.h);
    }

    draw() {
        this.game.ctx.drawImage(this.texture, this.x, this.y, this.w, this.h);
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