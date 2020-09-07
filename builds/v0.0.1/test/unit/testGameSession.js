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
            assert.ok(aGameSession instanceof GameSession);
        });

        it('A GameSession is a GameSpace', () => {
            const aGameSystem = new GameSystem();
            const aGameSession = new GameSession(aGameSystem);
            assert.ok(aGameSession instanceof GameSpace);
        });

        it('The GameSpace has an activePhase GameState', () => {
            const aGameSystem = new GameSystem();
            const aGameSession = new GameSession(aGameSystem);
            //console.log(aGameSession.activePhase);
            assert.ok(aGameSession.activePhase instanceof GameState);
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