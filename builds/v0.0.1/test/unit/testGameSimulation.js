/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const { AssertionError } = require('assert');
const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');
const User = require('../../src/GameSimulation/User.js');

const failMessage = {
    initWithoutInit: "isInitialized w/o init()",
    notInitAfter: "Not isInitialized after init()",
    joinWithoutInit: "join() does not error out when init() it not run"
};


describe('GameSimulation', () => {
    describe('init()', () => {
        it('The GameSimulation can be initialized', () => {
            const aGameSimulation = new GameSimulation();

            assert(!(aGameSimulation.isInitialized), failMessage.initWithoutInit);

            aGameSimulation.init();
            assert(aGameSimulation.isInitialized, failMessage.notInitAfter);
        });

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
    });
});