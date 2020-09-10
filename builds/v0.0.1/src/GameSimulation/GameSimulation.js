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
        this.isActive = true;
        while(this._activeSession.activePhase !==
                GameSession.PHASES.COMPLETE) {
            //console.log("Loop over the rules over and over");
            // check if the condition is true
            
            let ruleKeys = Object.getOwnPropertyNames(this._gameSystem.rules);

            ruleKeys.forEach(key => {
                const rule = this._gameSystem.rules[key];

                const condition = rule.condition.truthFunction;
                const boundRuleCondition = condition.bind(this._activeSession);
                const conditionResult = boundRuleCondition();
                //console.log(`rule ${key}\n${condition}`);

                if(conditionResult === undefined)
                    throw new Error(`Game cannot be run, rule ${key} invalid.`)
                
                if(conditionResult) {
                    const action = rule.action.action;
                    const boundRuleAction = action.bind(this._activeSession);
                }

                //rule
                //console.log(`${key}: ${rule.condition.truthfunction}`);
            });

            //console.log({GS_List: this._gameSystem.rules});

            //  - permit the action if it's a rule
            //  - submit the action if it's an aim
            i++;
            if (i > 10000) {console.log("done temp loop"); break;};
        }
        this.isActive = false;

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
        //console.log({KillActivePhase: this._activeSession.activePhase});
        this._activeSession.activePhase = GameSession.PHASES.COMPLETE;
        
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
        //console.log({suk2:this.keys.systemUser});
        const systemUser = this.userManager.atKey(this.keys.systemUser);
        //console.log({suo: systemUser});
        return systemUser;
    }


}

module.exports = GameSimulation;
