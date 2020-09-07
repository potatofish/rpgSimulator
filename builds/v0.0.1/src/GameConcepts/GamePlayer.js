/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require('./GameSpace');
const User = require('../GameSimulation/User');

class GamePlayer extends GameSpace {
    constructor(aUser) {
        if (!(aUser instanceof User)) {
            throw new Error("GamePlayers require a User")
        } 
        super(aUser.name);
    }

    get name() {
        return this.label;
    }
}

module.exports = GamePlayer;
