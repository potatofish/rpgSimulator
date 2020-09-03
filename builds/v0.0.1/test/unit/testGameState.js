/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameState = require('../../src/GameConcepts/GameState.js');

describe('GameState',  () => {
    describe('constructor()', () => {
        it('A basic GameState can be constructed', () => {
            const abasicGameState = new GameState();
            assert.ok(abasicGameState instanceof GameState);
        });
    });
});