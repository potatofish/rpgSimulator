/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require("../GameConcepts/GameSpace");

GameSpace

class GameCondition {
    constructor(aTruthFunction) {

        //validate arguments
        if (typeof aTruthFunction !== "function") {
            throw new Error(`aTruthFunction is not a function. ${aTruthFunction}`);
        }

        this._conditionFunction = aTruthFunction;
    }

    get truthFunction() {
        return this._conditionFunction;
    }

    checkAgainst(target) {
        if(!(target instanceof GameSpace)) {
            throw new Error('Target of check is not GameSpace');
        }
        // console.log({GCCheckAgainst: target.label, _conditionFunction: this._conditionFunction});
        let boundConditionFunction = this._conditionFunction.bind(target);
        const result = boundConditionFunction();
        // console.log({GCResult: result});
        if(typeof result !== "boolean") {
            throw new Error('Function does not return a truth value.');
        }

        return (!(!(result)));
    }


}

module.exports = GameCondition;
