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
        if (!(aGameSystem instanceof GameSystem)) {
            throw new Error("Sessions require a GameSystem of rules to play.");
        }


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

        set activePhase(phase) {
            if(Object.values(PHASES).indexOf(phase) === -1)
                throw new Error(`Phase '${phase}' is not valid. Valid: ${PHASES}`);
            // create a new phase object
            let newActivePhase = new GameState(phase);

            // move all subphases to the new phase object
            
            const subPhasesKeyList = this.activePhase.managedSpace.keys;
            console.log({activePhaseSpace: subPhasesKeyList});
            GameSpace.transfer(this.activePhase, newActivePhase);
                           
            // replace the old phase object
            //console.debug({oldActivePhase: this.atKey(this.keys.activePhase)});
            const oldActivePhase = this.remove(this.keys.activePhase);
            const newActivePhaseKey = this.contain(newActivePhase);
           // console.debug({newActivePhase: this.atKey(this.keys.activePhase)});
            this.keys.activePhase = newActivePhaseKey;
            
            return this.managedSpace.atKey(this.keys.activePhase);
        }



        get players() {
            console.log(this.managedSpace.list());
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
module.exports.PHASES = PHASES;
