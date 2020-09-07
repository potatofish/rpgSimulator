/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');
const User = require('../../src/GameSimulation/User.js');


describe('GamePlayer',  () => {
    describe('constructor()', () => {
        it('A basic GamePlayer can be constructed', () => {
            const userName = "aUser";
            const aUser = new User(userName);
            const abasicGamePlayer = new GamePlayer(aUser);
            assert.ok(abasicGamePlayer instanceof GamePlayer);
        });
    });
});