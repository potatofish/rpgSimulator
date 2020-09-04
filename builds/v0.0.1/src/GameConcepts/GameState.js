/* jshint node: true, esversion: 10*/
"use strict";

const GameConcept = require('./GameConcept');
st GameSpace = require('./GameSpace');

class GameState extends GameSpace {
    constructor(label) {
        super(label);
    }

    contain(aGameState) {
        if (!(aGameState instanceof GameState)) {
            throw new Error("GameStates can only contain Other GameStates");
        }
        super.contain(aGameState);
    }

    
    /* TODO revisit in later version
    static createFromJSON(someGameStateJSON) {
        let newGameState = new GameState();
        return newGameState;
    }
    */
}

module.exports = GameState;
