/* jshint node: true, esversion: 10*/
"use strict";

const EventEmitter = require('events');
const UserManager = require('./util/UserManager.js');
const SimulationEventEmitter = require('./util/SimulationEventEmitter');
const GamePlayer = require('../GameConcepts/GamePlayer.js');
const GameSession = require('../GameConcepts/GameSession.js');

const GameSystem = require('../GameRules/GameSystem.js');
const User = require('./User.js');
const SystemUser = require('./SystemUser.js');


class GameSimulation {
    constructor() {
        this.userManager = new UserManager();
        this.simulationEventEmitter = new SimulationEventEmitter();

        this.simulationEventEmitter.on('join', (aUser) => {
            //TODO output this to a chatbox
            console.log(`${aUser} has joined the session`);
        });

        this.simulationEventEmitter.on('sessionStarted', () => {
            this.watchRules();
        });

        this._options = {
            initialized : false
        };

        this.keys = {
            systemUser : undefined
        };

    }

    init() {        
        this._options = {
            initialized : true
        };

        let systemUser = new SystemUser();
        this.keys.systemUser = Object.getOwnPropertyNames(this.userManager.manage(systemUser))[0];
        let initResult = this.simulationEventEmitter.emit('initialized');

        //console.log({initResult: initResult});
    }

    async watchRules() {
        
        let i = 0;
        //this.isActive = true;
        let endWatchLoop = ()=>{
            let result = this._activeSession.activePhase !== GameSession.PHASES.COMPLETE;
            result = result || this.isKilled;
            return result;
        }
    //    console.log({ASOptionsWR1:this._activeSession._options});

        let stopLoop = false;
        while(!(stopLoop)) {
            // console.log({ASOptionsWR2:this._activeSession._options});

            await (async () => {
                let ruleKeys = Object.getOwnPropertyNames(this._gameSystem.rules);
    
                ruleKeys.forEach(key => {
                    const rule = this._gameSystem.rules[key];
    
                    if(rule.checkAgainst(this._activeSession)) {
                        rule.applyTo(this._activeSession);
                    }
                });
            })();

            stopLoop = endWatchLoop();
        }


    }

    load(aGameSystem) {
        if (!(aGameSystem instanceof GameSystem)) {
            throw new Error("load argument is not a GameSystem");
        }
        this._gameSystem = aGameSystem;
    }

    startSession() {
        if (this._gameSystem === undefined) {
            throw new Error("No game system defined");
        }
        this._activeSession = new GameSession(this._gameSystem);
        let initResult = this.simulationEventEmitter.emit('sessionStarted');

    }

    killSession() {
        if (this._activeSession === undefined) {
            throw new Error("No active Session to kill");
        }
       // console.log({KillActivePhase: this._activeSession.activePhase});
       
       this._activeSession.kill();
       this.userManager.release(this.keys.systemUser);
       this.keys.systemUser = undefined;
    //    console.log({ASOptionsKS:this._activeSession._options});
        // console.log({KillActivePhase: this._activeSession.activePhase});
        
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
    
    get isActive() {
        return this.keys.systemUser !== undefined;
    }

    get isKilled() {
        // console.log({ASOptionsIK:this._activeSession._options});
        return (this._activeSession._options._kill === true);

    }


}

module.exports = GameSimulation;
