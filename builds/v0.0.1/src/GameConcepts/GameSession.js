/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require('./GameSpace');
const GameState = require('./GameState');
const GameSystem = require('../GameRules/GameSystem.js');

const PHASES = {
    SETUP: "Set-up Play",
    ACTIVE: "Active Play",
    CLEANUP: "Clean-up Play",
    COMPLETE: "Completed Play" //shadow phase important for shutdown
};

let mapForPHASES = {};
mapForPHASES[PHASES.SETUP] = {previous: undefined};
mapForPHASES[PHASES.ACTIVE] = {previous: PHASES.SETUP};
mapForPHASES[PHASES.CLEANUP] = {previous: PHASES.ACTIVE};
mapForPHASES[PHASES.COMPLETE] = {previous: PHASES.CLEANUP};

//console.log({mapForPHASES: mapForPHASES});

class GameSession extends GameSpace {
    constructor(aGameSystem) {
        if (!(aGameSystem instanceof GameSystem)) {
            throw new Error("Sessions require a GameSystem of rules to play.");
        }


        super(`Area of Play for ${aGameSystem.label}`);

        let activePhase = new GameState(PHASES.SETUP);

        let activePhaseKey = this.contain(activePhase);

        this.keys = {
            activePhase : activePhaseKey
        };

        this._options = {};

        //console.log({sessionResult: resultKey});


     //   GameSpace.spawnIn(new GameState(PHASES.SETUP));
    }

        get activePhase() {
            // console.log({activePhaseKey: this.keys.activePhase});
            return this.retrieve(this.keys.activePhase);
        }

        set activePhase(phase) {
            // Reject if the phase is not valid
            const newPhaseIndex = Object.keys(mapForPHASES).indexOf(phase);
            if(newPhaseIndex === -1) {
                throw new Error(`Phase '${phase}' is not valid. Next Phase is: ${PHASES}`);
            }
            
            const expectedActivePhase = mapForPHASES[phase].previous;         
            if(expectedActivePhase !== this.activePhase.label) {
                throw new Error(`Cannot transition to ${phase}.`);
            }
            //console.log(Object.keys(mapForPHASES));

            // create a new phase object & move all subphases to the new phase object
            let newActivePhase = new GameState(phase);
            const subPhasesKeyList = this.activePhase.managedSpace.keys;
            GameSpace.transfer(this.activePhase, newActivePhase);
                           
            // replace the old phase object
            const oldActivePhase = this.remove(this.keys.activePhase);
            const newActivePhaseKey = this.contain(newActivePhase);
            this.keys.activePhase = newActivePhaseKey;
            
            //return this.managedSpace.atKey(this.keys.activePhase);
        }

        kill() {
            this._options._kill = true;
            let backupPhaseMap = {...mapForPHASES};
            
            let killablePhaseMap = {};
            const killedIDX = "Play Killed";
            killablePhaseMap[killedIDX] = {previous: this.activePhase.label};
            
            //console.log({clonePhaseMap: killablePhaseMap, mapForPHASES, activePhase: this.activePhase.label});
            
            mapForPHASES = killablePhaseMap;
            this.activePhase = killedIDX;
            mapForPHASES = backupPhaseMap;

            //console.log({activeSession: this, dead: this._options._kill});
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
