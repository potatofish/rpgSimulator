/*jshint node: true, esversion: 9*/
"use strict";
const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');
const GameSession = require('../../src/GameConcepts/GameSession.js');
const GameAim = require('../../src/GameRules/GameAim.js');
const GameCondition = require('../../src/GameRules/GameCondition.js');
const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');

// Active Play begins when 
//  - currently in setup phase
//  - two players have joined
//  - each has added a marker to their possession
function aimTostartActivePlay() {
    // atf: application templating functions
    const atf = GameSimulation.TEMPLATES.ACTIONS;

    const activePlayLabel = GameSession.PHASES.ACTIVE;
    const action = atf.changePhaseAction(activePlayLabel);

    const condition = new GameCondition(twoPlayersWithMarkersInSetup);
    const aim = new GameAim(action, condition);
    return aim;
}

function twoPlayersWithMarkersInSetup() {
    const GameState = require('../../src/GameConcepts/GameState.js');
    const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');
    const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');

    // ctf: condition templating functions
    const ctf = GameSimulation.TEMPLATES.CONDITIONS;
    // console.log({ enoughPlayersWithMarkersInSetup: this });
    const enoughPlayersInSetupCondition = ctf.hasEnoughPlayersInSetup(2);
    const enoughPlayersInSetup = enoughPlayersInSetupCondition.checkAgainst(this);
    
    const playerHasMarker = new GameCondition((player) => {
        if(!(player instanceof GamePlayer)) {
            throw new Error('errorMessage');
        }
        const aMarker = new GameState("Marker");
        return player.posesses(aMarker);
    });

    const forEachPlayerCondition = ctf.forEachPlayer(playerHasMarker);
    const trueForAllPlayers = forEachPlayerCondition.checkAgainst(this);
    return enoughPlayersInSetup && trueForAllPlayers;
};

exports.aimTostartActivePlay = aimTostartActivePlay;