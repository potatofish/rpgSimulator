/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');
const GameSystem = require('../../../src/GameRules/GameSystem.js');
const GameSession = require('../../../src/GameConcepts/GameSession.js');

const testSessionStartable = () => {
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

    setTimeout(endTest,5000,aGameSimulation);
    //endTest(aGameSimulation);
};

function endTest(aGameSimulation) {
    aGameSimulation.killSession();
    //console.log({ASOptions:aGameSimulation._activeSession._options});
    assert(aGameSimulation.isActive === false, "Session is still active");
    assert(aGameSimulation._activeSession._options._kill === true, "Session is not killed");

}
exports.testSessionStartable = testSessionStartable;

