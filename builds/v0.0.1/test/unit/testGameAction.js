/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameAction = require('../../src/GameRules/GameAction.js');
const GameConcept = require('../../src/GameConcepts/GameConcept.js');
const { debug } = require('console');

describe('GameAction',  () => {
    describe('constructor()', () => {
        it('A basic GameAction can be constructed', () => {
            const fooFunction = function() { console.log("fooFunction");};
            const aGameAction = new GameAction(fooFunction);
            assert.ok(aGameAction instanceof GameAction);
        });


        // /*
        it('A basic GameAction has an action function', () => {
            const testString = 'testString123';
            const fooFunction = function() { return `${testString}`;};
            const aGameAction = new GameAction(fooFunction);
        
            const log_output = {};
            log_output['✔action'] = aGameAction.action;
            log_output['✔fooFunction']= fooFunction;
            log_output['✔aGameAction.action']= aGameAction.action;

            //console.debug({log_output});

            assert.ok(fooFunction === aGameAction.action);
            assert.ok(fooFunction() === 'testString123');
            assert.ok(fooFunction() === aGameAction.action());
        }); // */
   
        // /*
        it('A basic GameAction can be invoked on a GameConcept', () => {
            const dummyLabel = 'testString123';
            const getLabel = function() { return this.label;};
            const fooTarget = new GameConcept(dummyLabel);
            const aGameAction = new GameAction(getLabel);

            const boundGetLabel = aGameAction.action.bind(fooTarget);

            //console.debug({fooTarget, label: boundGetLabel()});

            assert.ok(dummyLabel === boundGetLabel());
        }); //*/
    });
});