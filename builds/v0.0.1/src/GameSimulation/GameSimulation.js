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
const GameAim = require('../GameRules/GameAim.js');
const GameAction = require('../GameRules/GameAction.js');
const GameCondition = require('../GameRules/GameCondition.js');


class GameSimulation {
    constructor() {
        this.userManager = new UserManager();
        this.simulationEventEmitter = new SimulationEventEmitter();

        this.simulationEventEmitter.on('join', (aUser) => {
            const joinMessage = `${aUser.name} has joined the session`;
            //TODO output this to a chatbox
            this._dummyChatBox = joinMessage;
            return joinMessage;
        });

        this.simulationEventEmitter.on('sessionStarted', () => {
            //console.log("Start session");
            // this._watchRulesInterval = setInterval(() => {
            //     this.watchRules();
            // }, 1000);
        });

        this._options = {
            initialized : false
        };

        this._debug = {};

        this.keys = {
            systemUser : undefined
        };

        this.writeToChatBox("Simulation Started");

    }

    init() {        
        this._options = {
            initialized : true
        };

        let systemUser = new SystemUser();
        this.keys.systemUser = Object.getOwnPropertyNames(this.userManager.manage(systemUser))[0];
        let initResult = this.simulationEventEmitter.emit('initialized');

        // console.log({initResult: initResult});
    }

    watchRules() {
        //let i = 0;
        //this.isActive = true;
        let ruleKeys = Object.getOwnPropertyNames(this._gameSystem.rules);
        ruleKeys.forEach((key) => {
            const rule = this._gameSystem.rules[key];
            // console.log({activeSession: this._activeSession.label});
            
            let conditionCheckResult = rule.checkAgainst(this._activeSession);
            
            // console.log({GameAim: rule instanceof GameAim, rule});

            if(conditionCheckResult && rule instanceof GameAim) {
                let actionApplicationResult = rule.applyTo(this._activeSession);
            }
        });
        // console.log({"completed watchRules intervals": this._debug._watchRulesIntervals});
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
        this.init();
        this._activeSession = new GameSession(this._gameSystem);
        let initResult = this.simulationEventEmitter.emit('sessionStarted');
        // console.log("Session Started");

        this._debug._watchRulesIntervals = 0;
        
        this._watchRulesInterval = setInterval(() => {
            this.watchRules();
            this._debug._watchRulesIntervals++;
        }, 1000);
        // this._activeSession._options._kill = true;
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
        clearInterval(this._watchRulesInterval);
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

        let joinResult = this.simulationEventEmitter.emit('join', aUser);
        return playerForUser;
    }

    play() {
        //console.log({activePhase: this._activeSession.activePhase});
       if(this._activeSession.activePhase.label !== GameSession.PHASES.ACTIVE) {
           throw new Error(`Game cannot be played if active Phase is not '${GameSession.PHASES.ACTIVE}'.`);
       }
       this._options.playing = true;
    }

    get isPlaying() {
        return this._options.playing === true;
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

    writeToChatBox(aMessage) {
        if(typeof aMessage !== "string") {
            throw new Error('Only strings can be written to chat');
        }
        // TODO implement this as a gamespace object
        // for now just hold the last message to use as a debug feature
        this._dummyChatBox = aMessage;
    }

    get lastChatMessage() {
        return this._dummyChatBox;
    }


}

module.exports = GameSimulation;

const ruleTemplatingFunctions = {};
ruleTemplatingFunctions.basicPhaseTransitionAims = (targetPhase) => {
    let basicPhaseTransitionAims = {};
    
    const phaseList = ((aTargetPhase) => { 
        let tempPhaseList = Object.values(GameSession.PHASES);
        if (aTargetPhase === undefined) {
            //remove initial setup phase, never transitioned to
            const refinedPhaseList = removeValue(tempPhaseList, [GameSession.PHASES.SETUP, GameSession.PHASES.COMPLETE]);
            return refinedPhaseList;
        }

        if(tempPhaseList.indexOf(aTargetPhase) === -1 ) {
            console.log({vals: tempPhaseList, targ:(aTargetPhase)});
            throw new Error('invalidPhase');
        }
        return [aTargetPhase];
    })(targetPhase);


    phaseList.forEach((phase) => {

        const nextPhaseNamePrototyper = function (aPhase) {
            const functString = `return '${aPhase}';`;
            const nextPhaseFunction = new Function(functString);
            return nextPhaseFunction;
        };
        // console.log({nppm: `${nextPhaseProtoMaker}`});

        const nextPhaseName = nextPhaseNamePrototyper(phase);
        // console.log({npp: `${nextPhaseProto}`});

        const nextPhase = function () {
            console.log({npthis: this});
            let oldPhaseLabel = this.activePhase.label;
            this.activePhase = nextPhaseName();
            let newPhaseLabel = this.activePhase.label;
            return newPhaseLabel === nextPhaseName();
        };


        let nextPhaseAction = new GameAction(nextPhase);
        let undefinedCondition = new GameCondition(()=>{return false;});
        basicPhaseTransitionAims[phase]= (new GameAim(nextPhaseAction, undefinedCondition));
    });


    return (() => { 
        if (targetPhase === undefined)
            return basicPhaseTransitionAims;
        return basicPhaseTransitionAims[targetPhase];
    })();
};

module.exports.TEMPLATES = {};
module.exports.TEMPLATES.RULES = ruleTemplatingFunctions;

function removeValue(anArray, valuesToRemove) {
    let refinedArray = [].concat(anArray);
    let listOfParse = valuesToRemove;
    
    if(!(Array.isArray(valuesToRemove))) {
        listOfParse = [valuesToRemove];
    }

    console.log({listOfParse});

    listOfParse.forEach(valueToRemove => {
        const indexToRemove = anArray.indexOf(valueToRemove);
        console.log({ setupIndex: indexToRemove });
    
        const frontOfArray = (() => {
            if (indexToRemove === 0)
                return [];
            return anArray.slice(0, indexToRemove - 1);
        })();
    
        const backOfArray = (() => {
            if (indexToRemove === (anArray.length - 1))
                return [];
            return anArray.slice(indexToRemove + 1);
        })();
    
        refinedArray = frontOfArray.concat(backOfArray);
    });
    return refinedArray;
}

