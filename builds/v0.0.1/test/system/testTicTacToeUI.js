/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');

const { AssertionError } = require('assert');
const GameSession = require('../../src/GameConcepts/GameSession.js');
const GameState = require('../../src/GameConcepts/GameState.js');
const GameAim = require('../../src/GameRules/GameAim.js');
const GameCondition = require('../../src/GameRules/GameCondition.js');
const GameSystem = require('../../src/GameRules/GameSystem.js');
const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');
const User = require('../../src/GameSimulation/User.js');


describe('tictactoe', () => {
    describe('aims', () => {
        it('The tictactoe aims are aims', () => {
            let gs = new GameSystem("Tic Tac Toe");
            const startActivePlayAim = tttStartActivePlayAim();
            gs.add(startActivePlayAim);
            
            const found = gs.find(startActivePlayAim);
            console.log({found});
            
            assert(found !== undefined);
        });
    });
});


// Active Play begins when 
//  - currently in setup phase
//  - two players have joined
//  - each has added a marker to their possession
function tttStartActivePlayAim() {
    // atf: application templating functions
    const atf = GameSimulation.TEMPLATES.ACTIONS;
    const aMarker = new GameState("Marker");

    const activePlayLabel = GameSession.PHASES.ACTIVE;
    const changeToActiveAction = atf.changePhaseAction(activePlayLabel);

    const enoughPlayersWithMarkersInSetup = () => {
        // ctf: condition templating functions
        const ctf = GameSimulation.TEMPLATES.CONDITIONS;
        const enoughPlayersInSetupCondition = ctf.enoughPlayersInSetup(2);
        const enoughPlayersInSetup = enoughPlayersInSetupCondition.checkAgainst(this);

        const forEachPlayerCondition = ctf.forEachPlayer((player) => {
            player.posesses(aMarker);
        });
        const trueForAllPlayers = forEachPlayerCondition.checkAgainst(this);
        return enoughPlayersInSetup && trueForAllPlayers;
    };

    const startActivePlayAim = new GameAim(changeToActiveAction, new GameCondition(enoughPlayersWithMarkersInSetup));
    return startActivePlayAim;
}
