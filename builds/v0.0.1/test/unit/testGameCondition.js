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
        return this.label === "Foo";
    };

    const abasicGameCondition = new GameCondition(tempCondtionFunction);
    assert(abasicGameCondition instanceof GameCondition);
    assert(abasicGameCondition.truthFunction === tempCondtionFunction);

    const gameSpaceLabel = "Foo";
    const aGameSpace = new GameSpace(gameSpaceLabel);

    // binding localls
    let boundConditionFunction = abasicGameCondition.truthFunction.bind(aGameSpace);
    let result = boundConditionFunction();

    // bound internal to the check function
    assert(abasicGameCondition.checkAgainst(aGameSpace));
    assert(result);
    assert(abasicGameCondition.checkAgainst(aGameSpace) === result);
}

function testBindToGameSession() {
    const tempCondtionFunction = function () {
        return this.label === "Area of Play for FooSystem";
    };

    const abasicGameCondition = new GameCondition(tempCondtionFunction);
    assert(abasicGameCondition instanceof GameCondition);
    assert(abasicGameCondition.truthFunction === tempCondtionFunction);

    const gameSystemLabel = "FooSystem";
    const aGameSystem = new GameSystem(gameSystemLabel);

    const aGameSession = new GameSession(aGameSystem);
    assert(abasicGameCondition.checkAgainst(aGameSession));
}
