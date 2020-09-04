/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require('./GameSpace');

class GamePlayerSeat extends GameSpace {
    constructor() {
        super("PlayerSeat");
    }
}

module.exports = GamePlayerSeat;
