/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameRule = require('../../src/GameRules/GameRule.js');
const GameAction = require('../../src/GameRules/GameAction.js');
const GameCondition = require('../../src/GameRules/GameCondition.js');
const { testCheckAgainstGameSpace } = require("./testGameRule/testCheckAgainstGameSpace");
const { testCheckAgainstGameSession } = require('./testGameRule/testCheckAgainstGameSession');
const { testCheckAgainstDuringGameSimulation } = require('./testGameRule/testCheckAgainstDuringGameSimulation');



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

        it('A GameRule can be checked against an a GameSpace', () => {
            testCheckAgainstGameSpace();
        });

        it('A GameRule can be checked against an a GameSession', () => {
            testCheckAgainstGameSession();
        });

        it('A GameRule can be checked against an a GameSimulation', () => {
            testCheckAgainstDuringGameSimulation();
        });
    });
});