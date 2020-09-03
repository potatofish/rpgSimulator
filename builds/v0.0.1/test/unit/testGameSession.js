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

        it('A GameSession can return a copy of the GameSpace within', () => {
            const aGameSession = new GameSession();
            const sessionGameSpace = aGameSession.GameSpace;
            assert.ok(sessionGameSpace instanceof GameSpace);
        });

        it('A GameSession can return a copy of the GameState within', () => {
            const aGameSession = new GameSession();
            const sessionGameState = aGameSession.GameState;
            assert.ok(sessionGameState instanceof GameState);
        });
    });
});