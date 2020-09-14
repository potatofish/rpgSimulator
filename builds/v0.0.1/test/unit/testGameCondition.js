/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameCondition = require('../../src/GameRules/GameCondition.js');
const GameSystem = require('../../src/GameRules/GameSystem.js');

const GameSpace = require('../../src/GameConcepts/GameSpace.js');
const GameSession = require('../../src/GameConcepts/GameSession.js');
const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');


describe('GameCondition',  () => {
    describe('constructor()', () => {
        it('A basic GameCondition can be constructed', () => {
            const abasicGameCondition = new GameCondition(() => {});
            assert.ok(abasicGameCondition instanceof GameCondition);
        });

        it('A basic GameCondition can be bound to a GameSpace & evaluated', () => {
            testBindToGameSpace();
        });

        it('A basic GameCondition can be bound to a GameSession & evaluated', () => {
            testBindToGameSession();
        });
    });
});

function testBindToGameSpace() {
    const tempCondtionFunction = function () {
        return this.label;
    };

    const abasicGameCondition = new GameCondition(tempCondtionFunction);
    assert(abasicGameCondition instanceof GameCondition);
    assert(abasicGameCondition.truthFunction === tempCondtionFunction);

    const gameSpaceLabel = "Foo";
    const aGameSpace = new GameSpace(gameSpaceLabel);

    let boundConditionFunction = abasicGameCondition.truthFunction.bind(aGameSpace);
    let result = boundConditionFunction();
    assert(result === gameSpaceLabel);
}

function testBindToGameSession() {
    const tempCondtionFunction = function () {
        return this.label;
    };

    const abasicGameCondition = new GameCondition(tempCondtionFunction);
    assert(abasicGameCondition instanceof GameCondition);
    assert(abasicGameCondition.truthFunction === tempCondtionFunction);

    const gameSpaceLabel = "FooSystem";
    const aGameSystem = new GameSystem(gameSpaceLabel);

    const aGameSpace = new GameSession(aGameSystem);

    let boundConditionFunction = abasicGameCondition.truthFunction.bind(aGameSpace);
    let result = boundConditionFunction();
    assert(result === `Area of Play for ${gameSpaceLabel}`);
}
