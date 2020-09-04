/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameRule = require('../../src/GameRules/GameRule.js');
const GameAction = require('../../src/GameRules/GameAction.js');


describe('GameRule',  () => {
    describe('constructor()', () => {
        it('A basic GameRule can be constructed', () => {
            
            const basicFunction = () => {
                console.log("This does nothing");
            };

            const aGameAction = new GameAction(basicFunction);

            const abasicGameRule = new GameRule(aGameAction);


            assert.ok(abasicGameRule instanceof GameRule);
        });
    });
});