/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSystem = require('../../src/GameRules/GameSystem.js');
const GameAction = require('../../src/GameRules/GameAction.js');
const GameRule = require('../../src/GameRules/GameRule.js');
const GameCondition = require('../../src/GameRules/GameCondition.js');

describe('GameSystem',  () => {
    describe('constructor()', () => {
        it('A basic GameSystem can be constructed', () => {
            const abasicGameSystem = new GameSystem("Basic");
            assert.ok(abasicGameSystem instanceof GameSystem);
        });

        it('A basic rule can be stored in a GameSystem', () => {
            const aGameSystem = new GameSystem("Basic");
            
            const aGameAction = new GameAction(() => {
                console.log("This does nothing");
            });

            const aGameCondition = new GameCondition();

            const aGameRule = new GameRule(aGameAction,aGameCondition);
            const result = aGameSystem.add(aGameRule);

            const ruleKey = Object.getOwnPropertyNames(result)[0];
            console.debug({ruleKey, result});

            const lookedupGameRule = aGameSystem.lookup(ruleKey);
          
            assert.ok(lookedupGameRule === aGameRule);
        });
    });
});