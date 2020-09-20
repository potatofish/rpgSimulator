/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');

const testNewIsNotInit = () => {
    let msgs = {};
    const aGameSimulation = new GameSimulation();
    msgs.earlyInit = "Simulation isInitialized w/o starting a session.";
    assert(!(aGameSimulation.isInitialized), msgs.earlyInit);
    
    // session cannot be started cause there's no rules to init with
    msgs.startedWithout = "No error when starting Simulation w/o a GameSystem";
    const validProperties = { message: "No game system defined" };
    assert.throws((()=>{aGameSimulation.startSession();}), validProperties);
};
exports.testNewIsNotInit = testNewIsNotInit;
