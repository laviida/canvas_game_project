class MapManager {
    MAP_BRICK = "-";
    MAP_SPACE = "s";
    static MAPS = {
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
        ]
    }
    constructor(game) { this.game = game; }

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

        for (let index1 = 0; index1 < Math.floor(rows); index1++) { //rows
            map[index1].split(this.MAP_SPACE).length - 1 == map[index1].length ? row_gap = brick_height : row_gap = 0;
            cols = map[index1].length;
            for (let index = 0; index < Math.floor(cols); index++) { //cols
                map[index1][index] == this.MAP_SPACE && map[index1].split(this.MAP_SPACE).length - 1 != map[index1].length ? die = true : die = false;
                this.game.bricks.push(new Brick(index, (startX + (brick_width * index)) + col_gap * index, startY + (index1 * brick_height) + row_gap, brick_width, brick_height, die, TextureManager.BRICK_TEXTURE_SETS.purple.normal, this.game));
                this.game.bricks.forEach(brick => brick.initialize());
            }
        }
    }

}