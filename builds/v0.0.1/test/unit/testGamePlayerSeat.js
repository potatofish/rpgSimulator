/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GamePlayerSeat = require('../../src/GameConcepts/GamePlayerSeat.js');

describe('GamePlayerSeat',  () => {
    describe('constructor()', () => {
        it('A basic GamePlayerSeat can be constructed', () => {
            const abasicGamePlayerSeat = new GamePlayerSeat();
            assert.ok(abasicGamePlayerSeat instanceof GamePlayerSeat);
        });
    });
});