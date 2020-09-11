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
    });
});