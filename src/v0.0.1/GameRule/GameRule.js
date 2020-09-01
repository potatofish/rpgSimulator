/*jshint node: true, esversion: 9*/
"use strict";


// 2020-08-31 - transitioned Rule to GameRule
class GameRule {
    constructor(anAction, aCondition) {
       this.#action = anAction | new GameAction();
       this.#condition   = aCondition | new GameCondition()
    }

    get action() {
        return this.#action;
    }

    get condition() {
        return this.#condition;
    }
}

module.exports = GameRule;