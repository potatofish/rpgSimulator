/* jshint node: true, esversion: 10*/
"use strict";


const GameConcept = require('./GameConcept');

class GameSpace extends GameConcept {
    constructor() {
        super();
        Object.assign(this.options, {
            mobility: true,
            visibility: true
        });
        this.someSpace = new GameSpaceManager();
        //console.log({opts: this.options});
    }

    moveTo(objectToMove) {
        let errorMessage = false;
        switch (!(true)) {
            case objectToMove.isMobile:
                errorMessage = "This object is not mobile.";
                break;
            case this.someSpace.isFull:
                errorMessage = "This space is full.";
                break;
            default:
                break;
        }

        this.subGameSpace.manage(objectToMove);
    }

    get isMobile() {
        return this.options.mobility === true;
    }

    get isVisible() {
        return this.options.mobility === true;
    }

    /* TODO revisit in later version
    static createFromJSON(someGameSpaceJSON) {
        let newGameSpace = new GameSpace();
        return newGameSpace;
    }
    */
}

module.exports = GameSpace;
