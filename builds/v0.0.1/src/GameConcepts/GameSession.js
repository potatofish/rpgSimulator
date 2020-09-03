/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require('./GameSpace');
const GameState = require('./GameState');

const PHASES = {
    SETUP: "Set-up Play",
    ACTIVE: "Active Play",
    CLEANUP: "Clean-up Play",
    COMPLETE: "Completed Play" //shadow phase important for
    
};

class GameSession {
    constructor() {
        this.sessionSpace = new GameSpace();
        //console.log(this.sessionSpace.options);


     //   GameSpace.spawnIn(new GameState(PHASES.SETUP));
    }
    


    /* TODO redo these as the action "observe" 
    get GameSpaceJSON() {
        // return a copy
        //return Object.assign({}, this.sessionSpace);
        return JSON.stringify(this.sessionSpace);
    }

    get GameState(){
        // return a copy
        //return Object.assign({}, this.sessionSpace);
        return this.sessionState;
    }
    */
}


module.exports = GameSession;
