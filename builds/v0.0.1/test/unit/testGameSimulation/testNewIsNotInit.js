/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');

const testNewIsNotInit = () => {
    const aGameSimulation = new GameSimulation();
    const earlyInitMessage = "isInitialized w/o init()";
    assert(!(aGameSimulation.isInitialized), earlyInitMessage);
    
    //TODO assert that a session cannot be started cause there's no rules to init with
};
exports.testNewIsNotInit = testNewIsNotInit;
