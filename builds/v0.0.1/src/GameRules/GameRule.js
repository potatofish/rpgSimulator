/*jshint node: true, esversion: 9*/
"use strict";

const GameAction = require('./GameAction');
const GameCondition = require('./GameCondition');

// 2020-08-31 - transitioned Rule to GameRule
class GameRule {
    constructor(anAction, aCondition) {
       this.ruleAction = anAction;
       this.ruleCondition = aCondition;
    }

    get action() {
        return this.ruleAction;
    }

    get condition() {
        return this.ruleCondition;
    }
}

module.exports = GameRule;