/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');

const { AssertionError } = require('assert');
const GameAim = require('../../src/GameRules/GameAim.js');
const User = require('../../src/GameSimulation/User.js');
const TicTacToeSystem = require("./TicTacToeSystem");
const tta = require("./ticTacToeAims");
const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');
const GameSystem = require('../../src/GameRules/GameSystem.js');
const GameSession = require('../../src/GameConcepts/GameSession.js');
const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');
const GameSpace = require('../../src/GameConcepts/GameSpace.js');



describe('tictactoe', () => {
    describe('aimTostartActivePlay()', () => {
        it('The tictactoe aimTostartActivePlay functions', (done) => {
            const startActivePlayAim = tta.aimTostartActivePlay();
            assert(startActivePlayAim !== undefined);
            assert(startActivePlayAim instanceof GameAim);
            // console.log({startActivePlayAim});

            var tttRulesSystem = new TicTacToeSystem();
            const aimFromRuleSystem = tttRulesSystem.find(startActivePlayAim);
            assert(aimFromRuleSystem.isMatch(startActivePlayAim), "Aim was not found in tictactoe gameSystem");
            assert.notStrictEqual(aimFromRuleSystem, startActivePlayAim, "Aim created is not a copy");
            assert.notDeepStrictEqual(aimFromRuleSystem, startActivePlayAim, "Aim created is not a copy");

            //Start a session with only this rule and test it
            var startActivePlaySystem = new GameSystem("aimTostartActivePlay");
            var startActivePlaySim = new GameSimulation();
            startActivePlaySim.load(startActivePlaySystem);
            
            startActivePlaySim.startSession();
            setTimeout((sim) => {testRule(sim);endTest(sim);done();}, 1000, startActivePlaySim);
            
            
            function testRule(aGameSimulation) {
                assert(aGameSimulation instanceof GameSimulation);
                
                const session = startActivePlaySim._activeSession;
                assert(session instanceof GameSession);

                const aimCondition = startActivePlayAim.condition;
                const aimConditionResult = aimCondition.checkAgainst(session);
                
                assert(aimConditionResult === false, "Players Not Yet Added");

                const userTic = new User("Tic");
                const userTac = new User("Tac");
                
                const playerTac = aGameSimulation.join(userTac);
                const playerTic = aGameSimulation.join(userTic);

                const aimConditionResult2 = aimCondition.checkAgainst(session);
                assert(aimConditionResult2 === false, "Players Not Given Markers");
                
                const markerX = new GameSpace("Marker");
                const markerO = new GameSpace("Marker");
                
                playerTac.take(markerX);
                assert(playerTac.possesses(markerX));
                playerTic.take(markerO);
                assert(playerTic.possesses(markerO));

                assert(markerX !== markerO)
                assert(markerX.isMatch(markerO));


                console.log({playerTic});

                //TODO make possesses work with isMatch not ===
                const aimConditionResult3 = aimCondition.checkAgainst(session);
                assert(aimConditionResult3 === true, "Players Given Markers");
                
                console.log({phase: aGameSimulation._activeSession.activePhase});
                const activePhaseLabel = aGameSimulation._activeSession.activePhase.label;
                assert(activePhaseLabel === GameSession.PHASES.ACTIVE, `"${activePhaseLabel}" is not Active Play`);
                

                // const currentPhase = aGameSimulation._activeSession.activePhase.label;
                // //console.log({currentPhase});
                // assert(currentPhase === GameSession.PHASES.ACTIVE);
                
                // aGameSimulation.play();
                
                // assert(aGameSimulation.isPlaying);
            }
            
            function endTest(aGameSimulation) {
                assert(aGameSimulation instanceof GameSimulation);
                aGameSimulation.killSession();
                //console.log({ASOptions:aGameSimulation._activeSession._options});
                assert(aGameSimulation.isActive === false, "Session is still active");
                assert(aGameSimulation._activeSession._options._kill === true, "Session is not killed");
            }

        });
    });
});




