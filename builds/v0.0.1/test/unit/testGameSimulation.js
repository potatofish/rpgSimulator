/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const { AssertionError } = require('assert');
const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');
const GameSystem = require('../../src/GameRules/GameSystem.js');
const User = require('../../src/GameSimulation/User.js');
const GameSession = require('../../src/GameConcepts/GameSession.js');
const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');
const GameAim = require('../../src/GameRules/GameAim.js');
const GameAction = require('../../src/GameRules/GameAction.js');
const GameCondition = require('../../src/GameRules/GameCondition.js');

describe('GameSimulation', () => {
    describe('constructor()', () => {
        it('The GameSimulation constructs uninitialized', () => {
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
            
            aGameSimulation.killSession();
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
            aGameSimulation.killSession();
        }); 

        //testChangePhase(); 
        
        testChangePhaseByRule(); 
    });

    describe("this.systemUser", () => {
        it("Initializing starts the asynchronous systemuser process", () => {
            const aGameSim = new GameSimulation();
            const earlyInitMessage = "isInitialized w/o init()";
            assert(!(aGameSim.isInitialized), earlyInitMessage);
            
            aGameSim.init();
            const suNotManagedMessage = "systemUser not in user manager.";
            assert(aGameSim.isActive !== undefined, suNotManagedMessage);
            
            console.log({tst_pid: process.pid, tst_ppid: process.ppid});

            //create a basic aim:
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


            
            const aGameSystem = new GameSystem();
            const simpleSetupRule = new GameAim(simpleSetupAction,simpleSetupCondition);
            const simpleRuleKey = aGameSystem.add(simpleSetupRule);

            console.log({sysuser: aGameSim.isActive});
            
            aGameSim.load(aGameSystem);

            const suNotStartedMessage = "systemUser not active.";
            assert(aGameSim.isActive, suNotStartedMessage);
            
        });
    });
});

function testChangePhaseByRule() {
    it('A joined GameSimulation Session can change phases based on rules', () => {
        const aGameSimulation = new GameSimulation();
        const earlyInitMessage = "isInitialized w/o init()";
        assert(!(aGameSimulation.isInitialized), earlyInitMessage);

        aGameSimulation.init();
        const notInitMessage = "isInitialized w/o init()";
        assert(aGameSimulation.isInitialized, notInitMessage);

        const aGameSystem = new GameSystem();

        //create a basic aim:
        //setup is complete when a player is added to the session
        const simpleSetupCondition = new GameCondition(() => {
            console.log({simpleSetupCondition: this});
            //let condition = this.activePhase === GameSession.PHASES.SETUP;
            //condition = condition && this.players() === 1;
            let condition = true;
            return condition;
        });

        const simpleSetupAction = new GameAction(() => {
            console.log({simpleSetupAction: this});
            //this.activePhase = GameSession.PHASES.ACTIVE;
            return true;
        });



        // //console.debug({fooTarget, label: boundGetLabel()});
        // assert.ok(dummyLabel === boundGetLabel());
        const simpleSetupRule = new GameAim(simpleSetupAction, simpleSetupCondition);
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
        aGameSimulation.killSession();
    });
}

function testChangePhase() {
    it('A joined GameSimulation Session can change phases', () => {
        const aGameSimulation = new GameSimulation();
        const earlyInitMessage = "isInitialized w/o init()";
        assert(!(aGameSimulation.isInitialized), earlyInitMessage);

        aGameSimulation.init();
        const notInitMessage = "isInitialized w/o init()";
        assert(aGameSimulation.isInitialized, notInitMessage);

        const aGameSystem = new GameSystem();

        //create a basic aim:
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
        const simpleSetupRule = new GameAim(simpleSetupAction, simpleSetupCondition);
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

        } catch (error) {
            if (error instanceof AssertionError) {
                throw error;
            }
            assert.fail(`Unexpected error.\n\t ${error}`);
        }
        aGameSimulation.killSession();
    });
}
