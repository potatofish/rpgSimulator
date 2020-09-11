/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
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
        
        // TODO rethink these tests - these are join session test cases
        /*
        describe('join()', () => {
        it("A user can't join if GameSimulation is not initialized", () => {
            const aGameSimulation = new GameSimulation();
            assert(
                !(aGameSimulation.isInitialized), 
                failMessage.initWithoutInit
            );
    
            const aUser = new User();
            const errorMsg = "Not yet initialized. Try init().";
            try {
                aGameSimulation.join(aUser);
                assert.fail('expected exception not thrown');
            } catch (e) {
                // bubble up the assertion error if assert funcs have failed
                if (e instanceof AssertionError) { throw e; }
                
                assert.equal(
                    e.message,
                    errorMsg,
                    failMessage.joinWithoutInit
                );
            }
        });
    });

        it("A user can join if GameSimulation is initialized", () => {
            const aGameSimulation = new GameSimulation();
            aGameSimulation.init();
            assert(aGameSimulation.isInitialized);
            
            const userName = "aUser";
            const aUser = new User(userName);
            const aPlayer = aGameSimulation.join(aUser);
            
            assert.equal(aPlayer.label, userName);
            // assert aPlayer is in aGameSimulation
            // assert aPlayer in aGameSimulation with same user
            
        });
        
        // const aGameSystem = new GameSystem();
        //    const aGameSession = new GameSession(aGameSystem);

        it("The user is given a GamePlayer object", () => {
            const aGameSimulation = new GameSimulation();
            aGameSimulation.init();
            assert(aGameSimulation.isInitialized);
            
            const userName = "aUser";
            const aUser = new User(userName);
            const aPlayer = aGameSimulation.join(aUser);
            
            assert.equal(aPlayer.label, userName);
            // assert aPlayer is in aGameSimulation
            // assert aPlayer in aGameSimulation with same user
            
        });

        */
    });
});