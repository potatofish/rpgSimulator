/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const { AssertionError } = require('assert');
const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');
const GameSystem = require('../../src/GameRules/GameSystem.js');
const User = require('../../src/GameSimulation/User.js');
const GameSession = require('../../src/GameConcepts/GameSession.js');

describe('GameSimulation', () => {
    describe('constructor()', () => {
        it('The GameSimulation is uninitialized', () => {
            const aGameSimulation = new GameSimulation();
            const earlyInitMessage = "isInitialized w/o init()";
            assert(!(aGameSimulation.isInitialized), earlyInitMessage);

            aGameSimulation.init();
            const notInitMessage = "isInitialized w/o init()";
            assert(aGameSimulation.isInitialized, notInitMessage);
        });

        it('An initialized GameSimulation can load a GameSystem', () => {
            const aGameSimulation = new GameSimulation();
            const earlyInitMessage = "isInitialized w/o init()";
            assert(!(aGameSimulation.isInitialized), earlyInitMessage);
            
            aGameSimulation.init();
            const notInitMessage = "isInitialized w/o init()";
            assert(aGameSimulation.isInitialized, notInitMessage);
            
            const aGameSystem = new GameSystem();
            
            aGameSimulation.load(aGameSystem);
            assert.equal(aGameSimulation._gameSystem, aGameSystem);
        });

        it('An loaded GameSimulation can start a GameSession', () => {
            const aGameSimulation = new GameSimulation();
            const earlyInitMessage = "isInitialized w/o init()";
            assert(!(aGameSimulation.isInitialized), earlyInitMessage);
            
            aGameSimulation.init();
            const notInitMessage = "isInitialized w/o init()";
            assert(aGameSimulation.isInitialized, notInitMessage);
            
            const aGameSystem = new GameSystem();
            
            aGameSimulation.load(aGameSystem);
            assert.equal(aGameSimulation._gameSystem, aGameSystem);

            aGameSimulation.startSession();
            assert(aGameSimulation._activeSession instanceof GameSession);
        }); 
    });
});