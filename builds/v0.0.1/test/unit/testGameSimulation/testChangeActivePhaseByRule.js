/*jshint node: true, esversion: 9*/
'use strict';


const assert = require('assert');
const GameRule = require('../../../src/GameRules/GameRule.js');
const GameAction = require('../../../src/GameRules/GameAction.js');
const GameCondition = require('../../../src/GameRules/GameCondition.js');

const GameSystem = require('../../../src/GameRules/GameSystem.js');
const GameSession = require('../../../src/GameConcepts/GameSession.js');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');

function testChangeActivePhaseByRule() {
    const tempCondtionFunction = function () {
        console.log({thisAP: this.activePhase});
        //await this.label;
        return this.label === "Area of Play for FooSystem";
    };

    const tempActionFunction = function () {
        this._oldLabel = this.label;
        this.label = "Bar";
        return true;
    };

    const aGameCondition = new GameCondition(tempCondtionFunction);
    assert(aGameCondition instanceof GameCondition);
    assert(aGameCondition.truthFunction === tempCondtionFunction);

    const aGameAction = new GameAction(tempActionFunction);
    assert(aGameAction instanceof GameAction);
    assert(aGameAction._actionFunction === tempActionFunction);
    
    const abasicGameRule = new GameRule(aGameAction, aGameCondition);
    
    const gameSystemLabel = "FooSystem";
    const aGameSystem = new GameSystem(gameSystemLabel);
    aGameSystem.add(abasicGameRule);

    const aGameSimulation = new GameSimulation();
    // console.log({lastChat: aGameSimulation.lastChatMessage});
    aGameSimulation.load(aGameSystem);
    
    aGameSimulation.startSession();
    
    // console.log({lastChat: aGameSimulation.lastChatMessage});

    const activeSession = aGameSimulation._activeSession;
    assert(activeSession.label === "Area of Play for FooSystem", `label is ${activeSession.label}`);
    // assert(activeSession.label === "Bar", `label is ${activeSession.label}`);
    // assert(activeSession._oldLabel === "Area of Play for FooSystem", `_oldLabel is ${activeSession._oldLabel}`);

    aGameSimulation.killSession();
    assert(aGameSimulation.isActive === false, "Session is still active");
    assert(aGameSimulation._activeSession._options._kill === true, "Session is not killed");
}
exports.testChangeActivePhaseByRule = testChangeActivePhaseByRule;
