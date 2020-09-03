/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameConcept = require('../../src/GameConcepts/GameConcept.js');

describe('GameConcept',  () => {
    describe('constructor()', () => {
        it('A basic GameConcept can be constructed', () => {
            const abasicConcept = new GameConcept();
            assert.ok(abasicConcept instanceof GameConcept);
        });
    });
});