class MapManager {
    MAP_BRICK = "-";
    MAP_SPACE = "s";
    MAP_BRICK_RED = "r";
    MAP_BRICK_BROWN = "b";
    MAP_BRICK_BLUE = "B";
    MAP_BRICK_YELLOW = "y";
    MAP_BRICK_ORANGE = "o";
    MAP_BRICK_BLACK = "k";

    MAPS = {
        alien: [
            "----------",
            "----------",
            "----------",
            "-ss----ss-",
            "-ss----ss-",
            "-ss----ss-",
            "----------",
            "----------",
            "-s------s-",
            "--s----s--",
            "---s--s---",
            "----ss----",
            "----------",
            "----------",
            "----------",
            "----------",
            "sss----",
            "sss----",
            "sss----",
            "sss----",
            "----------",
            "----------",
            "----------",
            "--ss--ss--",
            "--ss--ss--",
            "--ss--ss--",
            "--ss--ss--",
            "--ss--ss--"
        ],
        ball: [
            "ssssss-ssssss",
            "sssss---sssss",
            "ssss-s-s-ssss",
            "ssss-----ssss",
            "sss-s-s-s-sss",
            "sss-------sss",
            "ss---------ss",
            "ss-s-s-s-s-ss",
            "ss---------ss",
            "ss---------ss",
            "ss---------ss",
            "s--ss-s-ss--s",
            "s--ss-s-ss--s",
            "s--ss-s-ss--s",
            "ss---------ss",
            "ss---------ss",
            "ss---------ss",
            "ss-s-s-s-s-ss",
            "ss---------ss",
            "sss-------sss",
            "sss-s-s-s-sss",
            "ssss-----ssss",
            "ssss-s-s-ssss",
            "sssss---sssss",
            "ssssss-ssssss"
        ],
        mario: [
            "sssrrrrrssss",
            "ssrrrrrrrrrs",
            "ssbbbookosss",
            "ssbbbookosss",
            "sboboookooos",
            "sbobbooobooo",
            "sbobbooobooo",
            "sbboooobbbbs",
            "sssoooooosss",
            "ssrrBrrBrrsss",
            "srrrBrrBrrrss",
            "srrrBrrBrrrss",
            "rrrrBrrBrrrr",
            "rrrrBBBBrrrr",
            "oorByBByBroo",
            "oooByBByBooo",
            "oooBBBBBBBoo",
            "ooBBBBBBBBoo",
            "ooBBBBBBBBoo",
            "ssBBBssBBBss",
            "ssbbssssbbss",
            "ssbbssssbbss",
            "sbbbssssbbbs",
            "sbbbssssbbbs"
        ],
        emoji: [
            "ssssskkkkksssss",
            "ssskkyyyyykksss",
            "sskyyyyyyyyykss",
            "skyyyyyyyyyyyks",
            "skyyyyyyyyyyyks",
            "skyyyyyyyyyyyks",
            "kkkkkkkkkkkkkkk",
            "kkkkkkkkkkkkkkk",
            "kyk--kkkk--kkyk",
            "kyk-kkkyk-kkkyk",
            "kyykkkyyykkkyyk",
            "kyyyyyyyyyyyyyk",
            "kyyyyyyyyyyyyyk",
            "skyyyyyyyyyyyks",
            "skyyyyyyyykyyks",
            "skyyykkkkkyyyks",
            "sskyyyyyyyyykss",
            "ssskkyyyyykksss",
            "ssssskkkkksssss"
        ],
        space: [
            "sssosssssosss",
            "sssosssssosss",
            "ssssosssossss",
            "ssssosssossss",
            "sssooooooosss",
            "sssooooooosss",
            "ssoosooosooss",
            "ssoosooosooss",
            "sooooooooooos",
            "sooooooooooos",
            "sosooooooosos",
            "sosooooooosos",
            "sososssssosos",
            "sososssssosos",
            "ssssoosoossss",
            "ssssoosoossss"
        ],
        prova: ["-"]
    }
    constructor(game) {
        this.game = game;
    }

    drawMap(map) {

        var rows = map.length;
        var cols = map[0].length;
        var col_gap = 0;
        var row_gap = 0;

        var brick_width = this.game.window_metrics.width * 0.05;
        var brick_height = this.game.window_metrics.height * 0.02;
        var startX = (this.game.window_metrics.width - (cols * brick_width) - (cols * col_gap)) / 2;
        var startY = 40;
        var die = false;
        var texture = TextureManager.BRICK_TEXTURE_SETS.purple.normal;

        for (let index1 = 0; index1 < Math.floor(rows); index1++) { //rows
            map[index1].split(this.MAP_SPACE).length - 1 == map[index1].length ? row_gap = brick_height : row_gap = 0;
            cols = map[index1].length;
            for (let index = 0; index < Math.floor(cols); index++) { //cols

                map[index1][index] == this.MAP_SPACE && map[index1].split(this.MAP_SPACE).length - 1 != map[index1].length ? die = true : die = false;
                map[index1][index] == this.MAP_BRICK_RED ? texture = TextureManager.BRICK_TEXTURE_SETS.red.normal :
                    map[index1][index] == this.MAP_BRICK_BROWN ? texture = TextureManager.BRICK_TEXTURE_SETS.brown.normal :
                        map[index1][index] == this.MAP_BRICK_BLUE ? texture = TextureManager.BRICK_TEXTURE_SETS.blue.normal :
                            map[index1][index] == this.MAP_BRICK_YELLOW ? texture = TextureManager.BRICK_TEXTURE_SETS.yellow.normal :
                                map[index1][index] == this.MAP_BRICK_ORANGE ? texture = TextureManager.BRICK_TEXTURE_SETS.orange.normal :
                                    map[index1][index] == this.MAP_BRICK_BLACK ? texture = TextureManager.BRICK_TEXTURE_SETS.black.normal :
                                        texture = TextureManager.BRICK_TEXTURE_SETS.purple.normal;

                var brick = new Brick(index, (startX + (brick_width * index)) + col_gap * index, startY + (index1 * brick_height) + row_gap, brick_width, brick_height, die, texture, this.game);
                this.game.bricks.push(brick);
                this.game.bricks.forEach(brick => brick.initialize());
            }
        }
    }

    getRandomMap() {
        return this.MAPS[Object.keys(this.MAPS).random()];
    }

    getMap(map) {
        return this.MAPS[map];
    }

}