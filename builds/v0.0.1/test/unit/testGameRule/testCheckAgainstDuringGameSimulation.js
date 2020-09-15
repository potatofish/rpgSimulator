/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameRule = require('../../../src/GameRules/GameRule.js');
const GameAction = require('../../../src/GameRules/GameAction.js');
const GameCondition = require('../../../src/GameRules/GameCondition.js');

const GameSystem = require('../../../src/GameRules/GameSystem.js');
const GameSession = require('../../../src/GameConcepts/GameSession.js');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');

function testCheckAgainstDuringGameSimulation() {
    const tempCondtionFunction = function () {
        // console.log({thisSim: this});
        return this.label === "Area of Play for FooSystem";
    };

    const tempActionFunction = function () {
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
    aGameSimulation.load(aGameSystem);

    aGameSimulation.startSession();
    //const aGameSession = new GameSession(aGameSystem);
    
    //assert(abasicGameRule.checkAgainst(aGameSession));
    
    //const actionResult = abasicGameRule.applyTo(aGameSession);
    aGameSimulation.killSession();
    assert(aGameSimulation.label === "Bar", `label is ${aGameSimulation.label}`);
}

exports.testCheckAgainstDuringGameSimulation = testCheckAgainstDuringGameSimulation;