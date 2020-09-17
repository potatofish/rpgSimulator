/*jshint node: true, esversion: 9*/
"use strict";

const GameSystem = require('../../src/GameRules/GameSystem.js');
const tta = require("./ticTacToeAims");

class TicTacToeSystem extends GameSystem {
    constructor() {
        // console.log(arguments.length); 
        if(arguments.length !== 0) {
            throw new Error('No Args please 🏴‍☠️');
        }
        super("Tic Tac Toe");
        const startActivePlayAim = tta.aimTostartActivePlay();
        this.add(startActivePlayAim);
        // return { this, startActivePlayAim };
    }

    // get 
}

module.exports = TicTacToeSystem;
