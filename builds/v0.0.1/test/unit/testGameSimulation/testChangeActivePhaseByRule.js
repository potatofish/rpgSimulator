/*jshint node: true, esversion: 9*/
'use strict';


const assert = require('assert');
const TEST_TEMPLATES = require('../TEST_TEMPLATES');

const GameAim = require('../../../src/GameRules/GameAim.js');
const GameAction = require('../../../src/GameRules/GameAction.js');
const GameCondition = require('../../../src/GameRules/GameCondition.js');

const GameSystem = require('../../../src/GameRules/GameSystem.js');
const GameSession = require('../../../src/GameConcepts/GameSession.js');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');
const User = require('../../../src/GameSimulation/User.js');
const GameState = require('../../../src/GameConcepts/GameState.js');

function testChangeActivePhaseByRule(done) {
    const atf = GameSimulation.TEMPLATES.ACTIONS;
    let activePlayLabel = GameSession.PHASES.ACTIVE;
    let changePhaseToActivePlayAction = atf.changePhaseAction(activePlayLabel);
    assert(changePhaseToActivePlayAction instanceof GameAction);
    
    const ctf = GameSimulation.TEMPLATES.CONDITIONS;
    const enoughPlayersInSetupCondition = ctf.hasEnoughPlayersInSetup(1);
    assert(enoughPlayersInSetupCondition instanceof GameCondition);
    
    const changeToActiveWhenEnoughAim = new GameAim(changePhaseToActivePlayAction, enoughPlayersInSetupCondition);

    const gameSystemLabel = TEST_TEMPLATES.LABELS.SYSTEM;
    const aGameSystem = new GameSystem(gameSystemLabel);
    aGameSystem.add(changeToActiveWhenEnoughAim);

    const aGameSimulation = new GameSimulation();
    aGameSimulation.load(aGameSystem);
    
    aGameSimulation.startSession();
    const aUser = new User(TEST_TEMPLATES.LABELS.USER);
    const userPlayer = aGameSimulation.join(aUser);

    const currentUsers = Object.values(aGameSimulation.userManager.list);

    assert.deepStrictEqual(currentUsers.length, 2);             // systemUser and aUser
    assert(currentUsers.indexOf(aUser) >= 0);

    const playerKeys = aGameSimulation._activeSession.players;
    assert.deepStrictEqual(playerKeys.length, 1);

    const playerFromSession = aGameSimulation._activeSession.retrieve(playerKeys[0]);
    assert.deepStrictEqual(playerFromSession, userPlayer);
  
    const activeSession = aGameSimulation._activeSession;
    const expectedSessionLabel = `Area of Play for ${gameSystemLabel}`;
    assert.deepStrictEqual(activeSession.label, expectedSessionLabel, `label is ${activeSession.label}`);
    assert.deepStrictEqual(activeSession.activePhase.label, GameSession.PHASES.SETUP);
    
    // wait 3s to allow rule to be applied
    setTimeout((sim) => {playTest(sim);endTest(sim);done();}, 2000, aGameSimulation);
}

function playTest(aGameSimulation) {
    const currentPhase = aGameSimulation._activeSession.activePhase.label;
    //console.log({currentPhase});
    assert(currentPhase === GameSession.PHASES.ACTIVE);
    
    aGameSimulation.play();
    
    assert(aGameSimulation.isPlaying);
}

function endTest(aGameSimulation) {
    aGameSimulation.killSession();
    //console.log({ASOptions:aGameSimulation._activeSession._options});
    assert(aGameSimulation.isActive === false, "Session is still active");
    assert(aGameSimulation._activeSession._options._kill === true, "Session is not killed");
}
exports.testChangeActivePhaseByRule = testChangeActivePhaseByRule;
