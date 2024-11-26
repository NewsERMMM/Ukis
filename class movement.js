class movement {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    playerControl() {

        if (kb.pressing('left')) {
            player.vel.x = -3;
        }
        else if (kb.pressing('right')) {
            player.vel.x = 3;
        }
        else player.vel.x = 0;

        if (kb.pressing('up')) {
            player.vel.y = -3;
        }
        else if (kb.pressing('down')) {
            player.vel.y = 3;
        }
        else player.vel.y = 0;

        if (toggle == 1) {
            player.vel.x = 0, player.vel.y = 0;
        }
    }
}