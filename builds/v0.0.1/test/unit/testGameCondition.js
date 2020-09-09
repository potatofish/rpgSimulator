/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameCondition = require('../../src/GameRules/GameCondition.js');

describe('GameCondition',  () => {
    describe('constructor()', () => {
        it('A basic GameCondition can be constructed', () => {
            const abasicGameCondition = new GameCondition(() => {});
            assert.ok(abasicGameCondition instanceof GameCondition);
        });

        it('A basic GameCondition must return a truth value', () => {
            const abasicGameCondition = new GameCondition(() => {return 5 === 5;});
            assert(abasicGameCondition.truthFunction !== undefined);
            assert(false, "Unfinished test case");
        });
    });
});