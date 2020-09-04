/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require('./GameSpace');
const GameState = require('./GameState');
const GameSystem = require('../GameRules/GameSystem.js');

const PHASES = {
    SETUP: "Set-up Play",
    ACTIVE: "Active Play",
    CLEANUP: "Clean-up Play",
    COMPLETE: "Completed Play" //shadow phase important for
    
};

class GameSession extends GameSpace {
    constructor(aGameSystem) {
        if (!(aGameSystem instanceof GameSystem))
            throw new Error("Sessions require a GameSystem of rules to play.");

        super(`Area of Play for ${aGameSystem}`);

        let activePhase = new GameState(PHASES.SETUP);

        let results = this.contain(activePhase);

        this.keys = {
            activePhase : Object.getOwnPropertyNames(results)[0]
        };

        //console.log({sessionResult: resultKey});


     //   GameSpace.spawnIn(new GameState(PHASES.SETUP));
    }

        get activePhase() {
            return this.managedSpace.atKey(this.keys.activePhase);
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
