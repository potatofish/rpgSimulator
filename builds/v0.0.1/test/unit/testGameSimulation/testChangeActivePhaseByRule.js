/*jshint node: true, esversion: 9*/
'use strict';


const assert = require('assert');
const GameRule = require('../../../src/GameRules/GameRule.js');
const GameAction = require('../../../src/GameRules/GameAction.js');
const GameCondition = require('../../../src/GameRules/GameCondition.js');

const GameSystem = require('../../../src/GameRules/GameSystem.js');
const GameSession = require('../../../src/GameConcepts/GameSession.js');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');
const User = require('../../../src/GameSimulation/User.js');

function testChangeActivePhaseByRule() {
    const tempCondtionFunction = function () {
        console.log({thisAP: this.players});
        //await this.label;
        return this.players >= 1;
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

    const aUser = new User("Barry Fu");
    const userPlayer = aGameSimulation.join(aUser);

    const currentUsers = Object.values(aGameSimulation.userManager.list);

    assert(currentUsers.length === 2);
    assert(currentUsers.indexOf(aUser) !== -1);

    const playerKeys = aGameSimulation._activeSession.players;
    assert(playerKeys.length === 1);

    const playerFromSession = aGameSimulation._activeSession.retrieve(playerKeys[0]);
    assert.deepStrictEqual(playerFromSession, userPlayer);
  
    const activeSession = aGameSimulation._activeSession;
    assert(activeSession.label === "Area of Play for FooSystem", `label is ${activeSession.label}`);
    
    //aGameSimulation.play();

    aGameSimulation.killSession();
    assert(aGameSimulation.isActive === false, "Session is still active");
    assert(aGameSimulation._activeSession._options._kill === true, "Session is not killed");
}
exports.testChangeActivePhaseByRule = testChangeActivePhaseByRule;
