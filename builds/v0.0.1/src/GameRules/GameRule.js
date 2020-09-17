/*jshint node: true, esversion: 9*/
"use strict";

const GameAction = require('./GameAction');
const GameCondition = require('./GameCondition');

// 2020-08-31 - transitioned Rule to GameRule
class GameRule {
    constructor(anAction, aCondition) {
        if(!(anAction instanceof GameAction)) {
            throw new Error(`anAction is not a GameAction: ${anAction}`);
        }
        if(!(aCondition instanceof GameCondition)) {
            throw new Error(`aCondition is not a GameCondition: ${aCondition}`);
        }

       this._action = anAction;
       this._condition = aCondition;
    }

    get action() {
        return this._action;
    }

    get condition() {
        return this._condition;
    }

    checkAgainst(...args) {
        return this._condition.checkAgainst(...args);
    }

    applyTo(...args) {
        return this._action.applyTo(...args);
    }

    isMatch(anotherGameRule) {
        if(!(anotherGameRule instanceof GameRule))
            return false;
        
        let result = this.action.isMatch(anotherGameRule.action);
        result = result && this.condition.isMatch(anotherGameRule.condition);
        return result;
    }
}

module.exports = GameRule;