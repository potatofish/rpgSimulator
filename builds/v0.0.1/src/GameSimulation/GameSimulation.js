/* jshint node: true, esversion: 10*/
"use strict";

const EventEmitter = require('events');
const UserManager = require('./util/UserManager.js');
const SimulationEventEmitter = require('./util/SimulationEventEmitter');
const GamePlayer = require('../GameConcepts/GamePlayer.js');
const GameSession = require('../GameConcepts/GameSession.js');

const GameSystem = require('../GameRules/GameSystem.js');

class GameSimulation {
    constructor() {
        this.userManager = new UserManager();
        this.simulationEventEmitter = new SimulationEventEmitter();

        this.simulationEventEmitter.on('join', (aUser) => {
            //TODO output this to a chatbox
            console.log(`${aUser} has joined the session`);
         });

        this._options = {
            initialized : false
        };

    }

    init() {        
        this._options = {
            initialized : true
        };
    }

    load(aGameSystem) {
        if (!(aGameSystem instanceof GameSystem)) {
            throw new Error("load argument is not a GameSystem")
        }
        this._gameSystem = aGameSystem;
    }

    startSession() {
        if (this._gameSystem === undefined) {
            throw new Error("No game system defined")
        }
        this._activeSession = new GameSession(this._gameSystem);
    }

    join(aUser) {
        if(!(this.isInitialized)) {
            let errorMessage = 
                "Not yet initialized. Try init().";
            throw new Error(errorMessage);
        }

        const managedUser = this.userManager.manage(aUser);
        //console.log({managedUser});
        
        // TODO use a GamePlayer factory
        let playerForUser = new GamePlayer(aUser);
        
        this._activeSession.contain(playerForUser);

        let joinResult = this.simulationEventEmitter.emit('join');
        return playerForUser;
    }

    play() {
       if(this._activeSession.activePhase !== GameSession.PHASES.ACTIVEPLAY) {
           throw new Error("Game cannot be played if active Phase is not 'Active Play'.");
       }
    }

    get isInitialized() {
        return this._options.initialized === true;
    }


}

module.exports = GameSimulation;
