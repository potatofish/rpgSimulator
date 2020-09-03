/* jshint node: true, esversion: 10*/
"use strict";

const GameConcept = require('./GameConcept');

class GameState extends GameConcept {
    constructor() {
        super();
    }

    
    /* TODO revisit in later version
    static createFromJSON(someGameStateJSON) {
        let newGameState = new GameState();
        return newGameState;
    }
    */
}

module.exports = GameState;
