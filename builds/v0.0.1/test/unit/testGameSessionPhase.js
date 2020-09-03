/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSessionPhase = require('../../src/GameConcepts/GameSessionPhase.js');

describe('GameSessionPhase',  () => {
    describe('constructor()', () => {
        it('A basic GameSessionPhase can be constructed', () => {
            const abasicGameSessionPhase = new GameSessionPhase();
            assert.ok(abasicGameSessionPhase instanceof GameSessionPhase);
        });
    });
});