/*jshint node: true, esversion: 9*/
'use strict';


const assert = require('assert');
const GameAim = require('../../../src/GameRules/GameAim.js');
const GameAction = require('../../../src/GameRules/GameAction.js');
const GameCondition = require('../../../src/GameRules/GameCondition.js');

const GameSystem = require('../../../src/GameRules/GameSystem.js');
const GameSession = require('../../../src/GameConcepts/GameSession.js');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');
const User = require('../../../src/GameSimulation/User.js');
const GameState = require('../../../src/GameConcepts/GameState.js');

function testChangeActivePhaseByRule() {
    const tempCondtionFunction = function () {
        const ctf = GameSimulation.TEMPLATES.CONDITIONS;
        let enoughPlayersCondition = ctf.getEnoughPlayersCondition(1);
        let enoughPlayers = enoughPlayersCondition.checkAgainst(this);

        let phaseInSetup = ctf.getInPhaseCondition(GameSession.PHASES.SETUP);
        let inSetup = phaseInSetup.checkAgainst(this);
        return enoughPlayers && inSetup;
    };
    
    const atf = GameSimulation.TEMPLATES.ACTIONS;
    let activePlayLabel = GameSession.PHASES.ACTIVE;
    let changePhaseToActivePlay = atf.getChangePhaseAction(activePlayLabel);
    assert(changePhaseToActivePlay instanceof GameAction);
    

    const aGameCondition = new GameCondition(tempCondtionFunction);
    assert(aGameCondition instanceof GameCondition);
    assert(aGameCondition.truthFunction === tempCondtionFunction);
    
    const abasicGameAim = new GameAim(changePhaseToActivePlay, aGameCondition);
    
    const gameSystemLabel = "FooSystem";
    const aGameSystem = new GameSystem(gameSystemLabel);
    // console.log({testGameAim: abasicGameAim instanceof GameAim});

    aGameSystem.add(abasicGameAim);

    const aGameSimulation = new GameSimulation();
    // console.log({lastChat: aGameSimulation.lastChatMessage});
    aGameSimulation.load(aGameSystem);
    
    aGameSimulation.startSession();

    const aUser = new User("Barry Fu");
    const userPlayer = aGameSimulation.join(aUser);

    const currentUsers = Object.values(aGameSimulation.userManager.list);

    assert(currentUsers.length === 2);
    assert(currentUsers.indexOf(aUser) !== -1);

    const playerKeys = aGameSimulation._activeSession.players;
    assert(playerKeys.length === 1);

    const playerFromSession = aGameSimulation._activeSession.retrieve(playerKeys[0]);
    assert.deepStrictEqual(playerFromSession, userPlayer);
  
    const activeSession = aGameSimulation._activeSession;
    assert(activeSession.label === "Area of Play for FooSystem", `label is ${activeSession.label}`);
    assert(aGameSimulation._activeSession.activePhase.label === GameSession.PHASES.SETUP);
    
    // wait 3s to allow rule to be applied
    setTimeout(playTest, 3000, aGameSimulation);
}

function playTest(aGameSimulation) {
    const currentPhase = aGameSimulation._activeSession.activePhase.label;
    //console.log({currentPhase});
    assert(currentPhase === GameSession.PHASES.ACTIVE);
    
    aGameSimulation.play();
    
    assert(aGameSimulation.isPlaying);
    setTimeout(endTest,5000,aGameSimulation);
}

function endTest(aGameSimulation) {
    aGameSimulation.killSession();
    //console.log({ASOptions:aGameSimulation._activeSession._options});
    assert(aGameSimulation.isActive === false, "Session is still active");
    assert(aGameSimulation._activeSession._options._kill === true, "Session is not killed");

}
exports.testChangeActivePhaseByRule = testChangeActivePhaseByRule;
