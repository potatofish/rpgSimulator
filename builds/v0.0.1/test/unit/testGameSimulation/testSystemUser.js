/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');
const GameSystem = require('../../../src/GameRules/GameSystem.js');
const GameSession = require('../../../src/GameConcepts/GameSession.js');
const GameAim = require('../../../src/GameRules/GameAim.js');
const GameAction = require('../../../src/GameRules/GameAction.js');
const GameCondition = require('../../../src/GameRules/GameCondition.js');

const testSystemUser = () => {
    const aGameSim = new GameSimulation();
    const earlyInitMessage = "isInitialized w/o init()";
    assert(!(aGameSim.isInitialized), earlyInitMessage);

    aGameSim.init();
    const suNotManagedMessage = "systemUser not in user manager.";
    assert(aGameSim.isActive !== undefined, suNotManagedMessage);

    console.log({ tst_pid: process.pid, tst_ppid: process.ppid });

    //create a basic aim:
    //setup is complete when a player is added to the session
    const simpleSetupCondition = new GameCondition(() => {
        let condition = this.activePhase === GameSession.PHASES.SETUP;
        condition = condition && this.players() === 1;
        return condition;
    });

    const simpleSetupAction = new GameAction(() => {
        this.activePhase = GameSession.PHASES.ACTIVE;
        return true;
    });



    const aGameSystem = new GameSystem();
    const simpleSetupRule = new GameAim(simpleSetupAction, simpleSetupCondition);
    const simpleRuleKey = aGameSystem.add(simpleSetupRule);

    console.log({ sysuser: aGameSim.isActive });

    aGameSim.load(aGameSystem);

    const suNotStartedMessage = "systemUser not active.";
    assert(aGameSim.isActive, suNotStartedMessage);

};
exports.testSystemUser = testSystemUser;
