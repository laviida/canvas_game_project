export class TextureManager {
    static BRICK_TEXTURE_SETS = {
        blue: {
            normal: "01-Breakout-Tiles",
            cracked: "02-Breakout-Tiles"
        },
        "light-green": {
            normal: "03-Breakout-Tiles",
            cracked: "04-Breakout-Tiles"
        },
        purple: {
            normal: "05-Breakout-Tiles",
            cracked: "06-Breakout-Tiles"
        },
        red: {
            normal: "07-Breakout-Tiles",
            cracked: "08-Breakout-Tiles"
        },
        orange: {
            normal: "09-Breakout-Tiles",
            cracked: "10-Breakout-Tiles"
        },
        "light-blue": {
            normal: "11-Breakout-Tiles",
            cracked: "12-Breakout-Tiles"
        },
        yellow: {
            normal: "13-Breakout-Tiles",
            cracked: "14-Breakout-Tiles"
        },
        green: {
            normal: "15-Breakout-Tiles",
            cracked: "16-Breakout-Tiles"
        },
        "dark-blue": {
            normal: "17-Breakout-Tiles",
            cracked: "18-Breakout-Tiles"
        },
        brown: {
            normal: "19-Breakout-Tiles",
            cracked: "20-Breakout-Tiles"
        },
        black: {
            normal: "21-Breakout-Tiles",
            cracked: "22-Breakout-Tiles"
        },
    }

    static POWER_TEXTURES = [{
            id: "41-Breakout-Tiles",
            color: "#173f5f",
            name: "slow"
        }, {
            id: "42-Breakout-Tiles",
            color: "#3caea3",
            name: "fast"
        }, {
            id: "43-Breakout-Tiles",
            color: "#20639b"
        },
        {
            id: "44-Breakout-Tiles",
            color: "#f6d55c",
            name: "lava"

        }, {
            id: "45-Breakout-Tiles",
            color: "#ed553b"
        }, {
            id: "46-Breakout-Tiles",
            color: "#071e22",
            name: "shrink"
        },
        {
            id: "47-Breakout-Tiles",
            color: "#ee2e31",
            name: "stretch"
        }, {
            id: "48-Breakout-Tiles",
            color: "#071e22"
        }, {
            id: "49-Breakout-Tiles",
            color: "#dbaca4",
            name: "invisible"
        }, {
            id: "50-Breakout-Tiles",
            color: "#8baca4"
        }
    ]


    static BRICK_TEXTURES_NORMAL = ["01-Breakout-Tiles", "03-Breakout-Tiles", "05-Breakout-Tiles", "07-Breakout-Tiles", "09-Breakout-Tiles",
        "11-Breakout-Tiles", "13-Breakout-Tiles", "15-Breakout-Tiles", "17-Breakout-Tiles", "19-Breakout-Tiles", "21-Breakout-Tiles"
    ]
    static BRICK_TEXTURES_CRACKED = ["02-Breakout-Tiles", "04-Breakout-Tiles", "06-Breakout-Tiles", "08-Breakout-Tiles", "10-Breakout-Tiles",
        "12-Breakout-Tiles", "14-Breakout-Tiles", "16-Breakout-Tiles", "18-Breakout-Tiles", "20-Breakout-Tiles", "22-Breakout-Tiles"
    ]

    static BRICK_STATE = {
        NORMAL: "NORMAL",
        CRACKED: "CRACKED"
    }

    static getBrickState(brick) {
        return TextureManager.BRICK_TEXTURES_NORMAL.includes(brick) ? TextureManager.BRICK_STATE.NORMAL :
            TextureManager.BRICK_TEXTURES_CRACKED.includes(brick) ? TextureManager.BRICK_STATE.CRACKED : null;
    }

    static getCrackedTextureId(id_texture) {
        let i = parseInt(id_texture.substr(0, 2)) + 1;
        return (i < 10 ? "0" + i : i) + id_texture.substr(2, id_texture.length);
    }

    static getTexture(id_texture, textures) {
        return textures.find(tex => tex.id == id_texture);
    }

    static loadTextures() {
        var promises = []
        for (let index = 1; index < 23; index++) {
            promises.push(new Promise(resolve => {
                let texture = new Image();
                texture.src = `./img/${index < 10 ? ("0" + index) : index}-Breakout-Tiles.png`;
                texture.id = `${index < 10 ? ("0" + index) : index}-Breakout-Tiles`;
                texture.onload = () => resolve(texture);
            }))
        }

        for (let index = 41; index < 51; index++) {
            promises.push(new Promise(resolve => {
                let texture = new Image();
                texture.src = `./powers/${index}-Breakout-Tiles.png`;
                texture.id = `${index}-Breakout-Tiles`;
                texture.onload = () => resolve(texture);
            }))
        }
        return Promise.all(promises);
    }
}