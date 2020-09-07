/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const { AssertionError } = require('assert');
const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');
const GameSystem = require('../../src/GameRules/GameSystem.js');
const User = require('../../src/GameSimulation/User.js');
const GameSession = require('../../src/GameConcepts/GameSession.js');
const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');
const GameRule = require('../../src/GameRules/GameRule.js');
const GameAction = require('../../src/GameRules/GameAction.js');
const GameCondition = require('../../src/GameRules/GameCondition.js');

describe('GameSimulation', () => {
    describe('constructor()', () => {
        it('The GameSimulation is uninitialized', () => {
            const aGameSimulation = new GameSimulation();
            const earlyInitMessage = "isInitialized w/o init()";
            assert(!(aGameSimulation.isInitialized), earlyInitMessage);

            aGameSimulation.init();
            const notInitMessage = "isInitialized w/o init()";
            assert(aGameSimulation.isInitialized, notInitMessage);
        });

        it('An initialized GameSimulation can load a GameSystem', () => {
            const aGameSimulation = new GameSimulation();
            const earlyInitMessage = "isInitialized w/o init()";
            assert(!(aGameSimulation.isInitialized), earlyInitMessage);
            
            aGameSimulation.init();
            const notInitMessage = "isInitialized w/o init()";
            assert(aGameSimulation.isInitialized, notInitMessage);
            
            const aGameSystem = new GameSystem();
            
            aGameSimulation.load(aGameSystem);
            assert.equal(aGameSimulation._gameSystem, aGameSystem);
        });

        it('A loaded GameSimulation can start a GameSession', () => {
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
        }); 

        it('A started GameSimulation Session can be joined', () => {
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

            const aUser = new User("Barry Fu");
            try {
                const userPlayer = aGameSimulation.join(aUser);
                assert(userPlayer instanceof GamePlayer);
            } catch (error) {
                if (error instanceof AssertionError) {
                    throw error;
                }
                assert.fail("Joining threw an error that it shouldnt' have.");
            }
        }); 

        it('A joined GameSimulation Session can be played', () => {
            const aGameSimulation = new GameSimulation();
            const earlyInitMessage = "isInitialized w/o init()";
            assert(!(aGameSimulation.isInitialized), earlyInitMessage);
            
            aGameSimulation.init();
            const notInitMessage = "isInitialized w/o init()";
            assert(aGameSimulation.isInitialized, notInitMessage);
            
            const aGameSystem = new GameSystem();
            
            //create a basic rule:
            //setup is complete when a player is added to the session
            const simpleSetupCondition = new GameCondition(() => {
                let condition = this.activePhase === GameSession.PHASES.SETUP;
                condition = condition && this.players() === 1;
                return condition;
            });
            
            const simpleSetupAction = new GameAction(() => {
                this.activePhase = GameSession.PHASES.ACTIVE;
                return true;
            });


            
            // //console.debug({fooTarget, label: boundGetLabel()});
            
            // assert.ok(dummyLabel === boundGetLabel());
            
            const simpleSetupRule = new GameRule(simpleSetupAction,simpleSetupCondition);
            const simpleRuleKey = aGameSystem.add(simpleSetupRule);
            
            //const boundSimpleSetup = aGameAction.action.bind(fooTarget);
            aGameSimulation.load(aGameSystem);
            assert.equal(aGameSimulation._gameSystem, aGameSystem);

            aGameSimulation.startSession();
            assert(aGameSimulation._activeSession instanceof GameSession);

            const aUser = new User("Barry Fu");
            try {
                const userPlayer = aGameSimulation.join(aUser);
                assert(userPlayer instanceof GamePlayer);

                aGameSimulation.play(aUser);


            } catch (error) {
                if (error instanceof AssertionError) {
                    throw error;
                }
                assert.fail(`Unexpected error.\n\t ${error}`);
            }
        }); 
    });
});