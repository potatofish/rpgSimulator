/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSession = require('../../src/GameConcepts/GameSession.js');
const GameSpace = require('../../src/GameConcepts/GameSpace.js');
const GameState = require('../../src/GameConcepts/GameState.js');
const GameSystem = require('../../src/GameRules/GameSystem.js');

describe('GameSession',  () => {
    describe('constructor()', () => {
        it('A GameSession can be constructed', () => {
            const aGameSystem = new GameSystem();
            const aGameSession = new GameSession(aGameSystem);
            assert.ok(aGameSession instanceof GameSession);
        });

        it('A GameSession is a GameSpace', () => {
            const aGameSystem = new GameSystem();
            const aGameSession = new GameSession(aGameSystem);
            assert.ok(aGameSession instanceof GameSpace);
        });

        it('The GameSpace has an activePhase GameState', () => {
            const aGameSystem = new GameSystem();
            const aGameSession = new GameSession(aGameSystem);
            //console.log(aGameSession.activePhase);
            assert.ok(aGameSession.activePhase instanceof GameState);
        });
    });
});