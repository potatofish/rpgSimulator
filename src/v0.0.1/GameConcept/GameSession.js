/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require('./GameSpace');
const GameState = require('./GameState');

// TODO implement actual dual inheritance (see https://www.tutorialsteacher.com/javascript/inheritance-in-javascript#:~:text=Inheritance%20is%20an%20important%20concept,supported%20by%20using%20prototype%20object.)

class GameSession {
    constructor() {
        GameSpace.call(this);
        GameState.call(this);
    }
}


module.exports = GameSession;
