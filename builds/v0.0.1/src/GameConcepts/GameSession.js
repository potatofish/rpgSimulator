/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require('./GameSpace');
const GameState = require('./GameState');

class GameSession {
    constructor() {
        this.sessionSpace = new GameSpace();
        this.sessionState = new GameState();
    }

    get GameSpace(){
        // return a copy
        //return Object.assign({}, this.sessionSpace);
        return  this.sessionSpace;
    }

    get GameState(){
        // return a copy
        //return Object.assign({}, this.sessionSpace);
        return this.sessionState;
    }
}


module.exports = GameSession;
