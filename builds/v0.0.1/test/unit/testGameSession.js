/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const {AssertionError} = require('assert');
const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');
const GameUser = require('../../src/GameSimulation/User.js');
const GameSession = require('../../src/GameConcepts/GameSession.js');
const GameSpace = require('../../src/GameConcepts/GameSpace.js');
const GameState = require('../../src/GameConcepts/GameState.js');
const GameSystem = require('../../src/GameRules/GameSystem.js');

describe('GameSession',  () => {
    describe('constructor()', () => {
        it('A GameSession can be constructed', () => {
            const aGameSystem = new GameSystem();
            const aGameSession = new GameSession(aGameSystem);

            const failsConstructorMsg = "GameSession constructor failed to make object";
            assert(aGameSession instanceof GameSession, failsConstructorMsg);
            
            const failsExtendMsg = "GameSession did not extend GameSpace";
            assert(aGameSession instanceof GameSpace, failsExtendMsg);

            const failsActivePhaseMsg = "Constructor did not activate GameState";
            assert(aGameSession.activePhase instanceof GameState, failsActivePhaseMsg);

            //console.log(aGameSession.activePhase.describe("label"));
            const failsWrongInitPhaseMsg = `Constructor did not init active GameState to ${GameSession.PHASES.SETUP}: ${{activePhase: aGameSession.activePhase.label}}`;
            assert(aGameSession.activePhase.label === GameSession.PHASES.SETUP, failsWrongInitPhaseMsg);
        });
        
        it('A GameSession can change to the next active phase for all phases', () => {
            const aGameSystem = new GameSystem();
            const aGameSession = new GameSession(aGameSystem);
            
            const failsConstructorMsg = "GameSession constructor failed to make object";
            assert(aGameSession instanceof GameSession, failsConstructorMsg);
            
            const failsExtendMsg = "GameSession did not extend GameSpace";
            assert(aGameSession instanceof GameSpace, failsExtendMsg);
            
            const failsActivePhaseMsg = "Constructor did not activate GameState";
            assert(aGameSession.activePhase instanceof GameState, failsActivePhaseMsg);

            const failsWrongInitPhaseMsg = `Constructor did not init active GameState to ${GameSession.PHASES.SETUP}: ${{activePhase: aGameSession.activePhase.label}}`;
            assert(aGameSession.activePhase.label === GameSession.PHASES.SETUP, failsWrongInitPhaseMsg);
            
            aGameSession.activePhase = GameSession.PHASES.ACTIVE;
            const failsChangeToActiveMsg = `Constructor did not change active GameState to ${GameSession.PHASES.ACTIVE}: ${{activePhase: aGameSession.activePhase.label}}`;
            assert(aGameSession.activePhase.label === GameSession.PHASES.ACTIVE, failsChangeToActiveMsg);

            aGameSession.activePhase = GameSession.PHASES.CLEANUP;
            const failsChangeToCleanUpMsg = `Constructor did not change active GameState to ${GameSession.PHASES.CLEANUP}: ${{activePhase: aGameSession.activePhase.label}}`;
            assert(aGameSession.activePhase.label === GameSession.PHASES.CLEANUP, failsChangeToCleanUpMsg);

            aGameSession.activePhase = GameSession.PHASES.COMPLETE;
            const failsChangeToCompleteMsg = `Constructor did not change active GameState to ${GameSession.PHASES.COMPLETE}: ${{activePhase: aGameSession.activePhase.label}}`;
            assert(aGameSession.activePhase.label === GameSession.PHASES.COMPLETE, failsChangeToCompleteMsg);
        });
        
        it('A GameSession can be killed, setting the active phase', () => {
            const aGameSystem = new GameSystem();
            const aGameSession = new GameSession(aGameSystem);
            
            const failsConstructorMsg = "GameSession constructor failed to make object";
            assert(aGameSession instanceof GameSession, failsConstructorMsg);
            
            const failsExtendMsg = "GameSession did not extend GameSpace";
            assert(aGameSession instanceof GameSpace, failsExtendMsg);
            
            const failsActivePhaseMsg = "Constructor did not activate GameState";
            assert(aGameSession.activePhase instanceof GameState, failsActivePhaseMsg);

            const failsWrongInitPhaseMsg = `Constructor did not init active GameState to ${GameSession.PHASES.SETUP}: ${{activePhase: aGameSession.activePhase.label}}`;
            assert(aGameSession.activePhase.label === GameSession.PHASES.SETUP, failsWrongInitPhaseMsg);
            
            aGameSession.activePhase = GameSession.PHASES.ACTIVE;
            const failsChangeToActiveMsg = `Constructor did not change active GameState to ${GameSession.PHASES.ACTIVE}: ${{activePhase: aGameSession.activePhase.label}}`;
            assert(aGameSession.activePhase.label === GameSession.PHASES.ACTIVE, failsChangeToActiveMsg);

            aGameSession.kill();

            try {
                aGameSession.activePhase = GameSession.PHASES.COMPLETE;
                const failsChangeToCompleteMsg = `Setting active GameState to ${GameSession.PHASES.COMPLETE}: did not throw error.`;
                assert.fail(failsChangeToCompleteMsg);
                
            } catch (error) {
                if (error instanceof AssertionError) {
                    throw error;
                }
                assert(aGameSession.activePhase.label === "Play Killed");
            }
        });


        // TODO rethink these tests - these are join session test cases

        describe('join()', () => {
            it("A player can join a GameSession", testCanPlayerJoin);
        });
    });
});

function testCanPlayerJoin() {
    const aGameSystem = new GameSystem();
    const aGameSession = new GameSession(aGameSystem);
    
    assert(aGameSession instanceof GameSession, "Object is not GameSession");
    assert(aGameSession instanceof GameSpace, "Object is not GameSpace");
    const aGamePlayer = new GamePlayer(new GameUser("Barry Fu"));

    //console.log({aGamePlayer});
    aGameSession.join(aGamePlayer);
    const playerList = aGameSession.players;
    assert(aGameSession.players.length === 1, "player not added");
    
    const playerFromSession = aGameSession.retrieve(playerList[0]);
    assert(playerFromSession === aGamePlayer, "Player doesn't match");
}
