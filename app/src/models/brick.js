import { TextureManager } from "../managers/textures.js";

export class Brick {
    constructor(id, x, y, w, h, die = false, texture, game) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.textureManager = window.game.textureManager;
        this.game = game;
        this.texture = this.textureManager.getTexture(texture, this.game.textures);
        this.die = die;
        this.power = Math.random() > 0.9;
        this.pup = this.power ? this.textureManager.POWER_TEXTURES.random() : null;
        this.texturePowerUp = this.power ? this.textureManager.getTexture(this.pup.id, this.game.textures) : null;
    }

    initialize() {
        this.game.ctx.drawImage(this.texture, this.x, this.y, this.w, this.h);
    }

    draw() {
        this.game.ctx.drawImage(this.texture, this.x, this.y, this.w, this.h);
        if (this.power) {
            this.game.ctx.strokeStyle = this.pup.color;
            this.game.ctx.lineWidth = 3;
            this.game.ctx.strokeRect(this.x, this.y, this.w, this.h);
        }
    }

    collide(lava) {
        if (lava) this.die = true;
        else if (this.textureManager.getBrickState(this.texture.id) == this.textureManager.BRICK_STATE.NORMAL) this.setTexture(this.textureManager.getCrackedTextureId(this.texture.id));
        else if (this.textureManager.getBrickState(this.texture.id) == this.textureManager.BRICK_STATE.CRACKED) this.die = true;
    }

    setTexture(texture) {
        this.texture = this.textureManager.getTexture(texture, this.game.textures);
    }

    update() {
        this.draw();
    }
}