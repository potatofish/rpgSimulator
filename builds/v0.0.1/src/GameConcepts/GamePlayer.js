/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require('./GameSpace');

class GamePlayer extends GameSpace {
    constructor(name) {
        super(name);
    }

    get name() {
        return this.label;
    }
}

module.exports = GamePlayer;
