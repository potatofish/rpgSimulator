/*jshint node: true, esversion: 9*/
'use strict';

const assert = require('assert');
const { AssertionError } = require('assert');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');
const GameSystem = require('../../../src/GameRules/GameSystem.js');
const User = require('../../../src/GameSimulation/User.js');
const GameSession = require('../../../src/GameConcepts/GameSession.js');
const GamePlayer = require('../../../src/GameConcepts/GamePlayer.js');

const testSessionJoinable = () => {
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

    const aUsersName = "Barry Fu";
    const aUser = new User(aUsersName);
    try {
        const userPlayer = aGameSimulation.join(aUser);
        assert(userPlayer instanceof GamePlayer);
        
        const expectedOnJoinChatMessage = `${aUsersName} has joined the session`
        assert(aGameSimulation.lastChatMessage === expectedOnJoinChatMessage)
    } catch (error) {
        if (error instanceof AssertionError) {
            throw error;
        }
        assert.fail("Joining threw an error that it shouldnt' have.");
    }
    setTimeout(endTest,5000,aGameSimulation);
    //endTest(aGameSimulation);
};

function endTest(aGameSimulation) {
    aGameSimulation.killSession();
    //console.log({ASOptions:aGameSimulation._activeSession._options});
    assert(aGameSimulation.isActive === false, "Session is still active");
    assert(aGameSimulation._activeSession._options._kill === true, "Session is not killed");

}
exports.testSessionJoinable = testSessionJoinable;
