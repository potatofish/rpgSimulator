/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameRule = require('../../src/GameRules/GameRule.js');
const GameAction = require('../../src/GameRules/GameAction.js');
const GameCondition = require('../../src/GameRules/GameCondition.js');
const GameSpace = require('../../src/GameConcepts/GameSpace.js');
const GameSystem = require('../../src/GameRules/GameSystem.js');
const GameSession = require('../../src/GameConcepts/GameSession.js');


describe('GameRule', () => {
    describe('constructor()', () => {
        it('A basic GameRule can be constructed', () => {

            const basicFunction = () => {
                console.log("This does nothing");
            };
            
            const aGameAction = new GameAction(basicFunction);
            const aGameCondition = new GameCondition(() => {return true;});
            const abasicGameRule = new GameRule(aGameAction, aGameCondition);

            assert.ok(abasicGameRule instanceof GameRule);
        });

        it('A GameRule can be checked against an a GameSpace', () => {
            testCheckAgainstGameSpace();
        });

        it('A GameRule can be checked against an a GameSession', () => {
            testCheckAgainstGameSession();
        });
    });
});

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

function testCheckAgainstGameSession() {
    const tempCondtionFunction = function () {
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
    const aGameSession = new GameSession(aGameSystem);
    
    assert(abasicGameRule.checkAgainst(aGameSession));
    
    const actionResult = abasicGameRule.applyTo(aGameSession);
    assert(aGameSession.label === "Bar");
}
