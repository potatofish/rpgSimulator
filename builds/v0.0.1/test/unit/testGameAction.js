/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameAction = require('../../src/GameRules/GameAction.js');
const GameConcept = require('../../src/GameConcepts/GameConcept.js');

describe('GameAction',  () => {
    describe('constructor()', () => {
        it('A basic GameAction can be constructed', () => {
            const fooFunction = function() { console.log("fooFunction");};
            const aGameAction = new GameAction(fooFunction);
            assert.ok(aGameAction instanceof GameAction);
        });


        it('A basic GameAction has an action function', () => {
            const fooDate = Date.now();
            const fooFunction = function() { return `${fooDate}`;};
            const fooTarget = new GameConcept("foo");
            const aGameAction = new GameAction(fooFunction);
            console.log({action: aGameAction.action});

            assert.ok(aGameAction.action === fooFunction);
        });

        it('A basic GameAction can be invoked on a GameConcept', () => {
            const fooDate = Date.now();
            const fooFunction = function() { return `${fooDate}`;};
            const fooTarget = new GameConcept("foo");
            const aGameAction = new GameAction(fooFunction);

            

            fooTarget.bind({action: aGameAction.action});

            const fooResult = fooTarget.action();
            delete fooResult.action;

            assert.ok(fooResult === fooDate);
        });
    });
});