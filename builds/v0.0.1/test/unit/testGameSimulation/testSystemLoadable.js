/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');
const GameSystem = require('../../../src/GameRules/GameSystem.js');

const testSystemLoadable = () => {
    const aGameSimulation = new GameSimulation();
    const earlyInitMessage = "isInitialized w/o init()";
    assert(!(aGameSimulation.isInitialized), earlyInitMessage);

    aGameSimulation.init();
    const notInitMessage = "isInitialized w/o init()";
    assert(aGameSimulation.isInitialized, notInitMessage);

    const aGameSystem = new GameSystem();

    aGameSimulation.load(aGameSystem);
    assert.equal(aGameSimulation._gameSystem, aGameSystem);
};
exports.testSystemLoadable = testSystemLoadable;
