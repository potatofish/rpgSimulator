/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSession = require('../../src/GameConcepts/GameSession.js');
const GameSpace = require('../../src/GameConcepts/GameSpace.js');
const GameState = require('../../src/GameConcepts/GameState.js');

describe('GameSession',  () => {
    describe('constructor()', () => {
        it('A GameSession can be constructed', () => {
            const aGameSession = new GameSession();
            assert.ok(aGameSession instanceof GameSession);
        });

        it('A GameSession has a GameSpace', () => {
            const aGameSession = new GameSession();
            assert.ok(aGameSession.sessionSpace instanceof GameSpace);
        });
    });
});