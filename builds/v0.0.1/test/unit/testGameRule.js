/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameRule = require('../../src/GameRules/GameRule.js');
const GameAction = require('../../src/GameRules/GameAction.js');
const GameCondition = require('../../src/GameRules/GameCondition.js');
const GameSpace = require('../../src/GameConcepts/GameSpace.js');


describe('GameRule', () => {
    describe('constructor()', () => {
        it('A basic GameRule can be constructed', () => {

            const basicFunction = () => {
                console.log("This does nothing");
            };
            
            const aGameAction = new GameAction(basicFunction);
            const aGameCondition = new GameCondition(() => {return true;});
            const abasicGameRule = new GameRule(aGameAction, aGameCondition);

            assert.ok(abasicGameRule instanceof GameRule);
        });

        it('A GameRule can be checked against an aGameSpace', () => {

            const basicFunction = () => {
                console.log("This does nothing");
            };

            const aGameSpace = new GameSpace("Basic User");
            
            const aGameAction = new GameAction(basicFunction);
            
            const truthFunction = function () {
                //console.log({ this: this });
                return this.label === "Basic User";
            };

            const aGameCondition = new GameCondition(truthFunction);

            const abasicGameRule = new GameRule(aGameAction, aGameCondition);
            const ruleCondtion = abasicGameRule.condition.truthFunction;
            
            assert.equal(truthFunction, abasicGameRule.condition.truthFunction);

            const boundLocalCondition = truthFunction.bind(aGameSpace);
            const boundRuleCondition = ruleCondtion.bind(aGameSpace);

            assert(boundLocalCondition());
            assert(boundRuleCondition());
        });
    });
});