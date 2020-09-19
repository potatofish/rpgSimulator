/*jshint node: true, esversion: 9*/
"use strict";
const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');
const GameSession = require('../../src/GameConcepts/GameSession.js');
const GameAim = require('../../src/GameRules/GameAim.js');
const GameCondition = require('../../src/GameRules/GameCondition.js');
const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');
const GameSpace = require('../../src/GameConcepts/GameSpace.js');


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
    const GameSpace = require('../../src/GameConcepts/GameSpace.js');
    const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');
    const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');

    // ctf: condition templating functions
    const ctf = GameSimulation.TEMPLATES.CONDITIONS;
    // console.log({ enoughPlayersWithMarkersInSetup: this });
    const enoughPlayersInSetupCondition = ctf.hasEnoughPlayersInSetup(2);
    const enoughPlayersInSetup = enoughPlayersInSetupCondition.checkAgainst(this);
    

    //TODO stop using quick formatting =>
    const possessesMarker = function () {
        // console.log({ checkPossessMarker: this.label });
        if (!(this instanceof GamePlayer)) {
            throw new Error("this isn't a GamePlayer");
        }
        const aMarker = new GameSpace("Marker");
        return this.possesses(aMarker);
        //return false;
    };

    const playerHasMarker = new GameCondition(possessesMarker);

    const forEachPlayerCondition = ctf.forEachPlayer(playerHasMarker);
    // console.log({forEachPlayerCondition});

    const trueForAllPlayers = forEachPlayerCondition.checkAgainst(this);
    return enoughPlayersInSetup && trueForAllPlayers;
};

exports.aimTostartActivePlay = aimTostartActivePlay;