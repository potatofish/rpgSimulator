const assert = require('assert');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');

const testNewIsNotInit = () => {
    const aGameSimulation = new GameSimulation();
    const earlyInitMessage = "isInitialized w/o init()";
    assert(!(aGameSimulation.isInitialized), earlyInitMessage);

    aGameSimulation.init();
    const notInitMessage = "isInitialized w/o init()";
    assert(aGameSimulation.isInitialized, notInitMessage);
};
exports.testNewIsNotInit = testNewIsNotInit;
