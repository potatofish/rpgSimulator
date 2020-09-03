/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSpace = require('../../src/GameConcepts/GameSpace.js');

describe('GameSpace',  () => {
    describe('constructor()', () => {
        it('A basic GameSpace can be constructed', () => {
            const abasicGameSpace = new GameSpace();
            assert.ok(abasicGameSpace instanceof GameSpace);
        });
    });
});