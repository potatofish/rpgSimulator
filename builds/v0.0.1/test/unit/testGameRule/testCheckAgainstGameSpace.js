/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameRule = require('../../../src/GameRules/GameRule.js');
const GameAction = require('../../../src/GameRules/GameAction.js');
const GameCondition = require('../../../src/GameRules/GameCondition.js');
const GameSpace = require('../../../src/GameConcepts/GameSpace.js');

function testCheckAgainstGameSpace() {
    const tempCondtionFunction = function () {
        return this.label === "Foo";
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

    const gameSpaceLabel = "Foo";
    const aGameSpace = new GameSpace(gameSpaceLabel);

    const abasicGameRule = new GameRule(aGameAction, aGameCondition);
    assert(abasicGameRule.checkAgainst(aGameSpace));

    const actionResult = abasicGameRule.applyTo(aGameSpace);
    assert(aGameSpace.label === "Bar");
}
exports.testCheckAgainstGameSpace = testCheckAgainstGameSpace;
