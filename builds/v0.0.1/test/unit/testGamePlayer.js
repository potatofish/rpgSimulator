/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');

describe('GamePlayer',  () => {
    describe('constructor()', () => {
        it('A basic GamePlayer can be constructed', () => {
            const abasicGamePlayer = new GamePlayer();
            assert.ok(abasicGamePlayer instanceof GamePlayer);
        });
    });
});