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

    // TODO make possessions a specific subset of players' managed space
    take(target) {
        return this.contain(target);
    }

    possesses(target) {
        // TODO redo this with matching keysof
        let targetKeys = this.managedSpace.keysOf(target);
        return targetKeys !== undefined && targetKeys.length > 0;
    }
}

module.exports = GamePlayer;
