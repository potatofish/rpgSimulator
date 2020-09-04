/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameAction = require('../../src/GameRules/GameAction.js');
const GameConcept = require('../../src/GameConcepts/GameConcept.js');

describe('GameAction',  () => {
    describe('constructor()', () => {
        it('A basic GameAction can be constructed', () => {
            const fooFunction = function() { console.log("fooFunction");};
            //const fooTarget = new GameConcept("foo");
            const aGameAction = new GameAction(fooFunction);
            assert.ok(aGameAction instanceof GameAction);
        });
    });
});