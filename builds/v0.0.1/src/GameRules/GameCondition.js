/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require("../GameConcepts/GameSpace");
const { debugLog, increaseNest, decreaseNest } = require("./debugLog");

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
        const how = this._conditionFunction.name;
        const what = target.label;
        const type = target.constructor.name;
        const message = `Checking ${how}() against a ${type} called "${what}"`;
        debugLog(message);
        increaseNest();

        const properties = Object.getOwnPropertyNames(target);
        debugLog(`${what} has properties [${properties}]`);


        if(!(target instanceof GameSpace)) {
            throw new Error(`Target of check is not GameSpace: ${target}`);
        }
        // console.log({GCCheckAgainst: target.label, _conditionFunction: this._conditionFunction});
        let boundConditionFunction = this._conditionFunction.bind(target);
        const result = boundConditionFunction();
        // console.log({GCResult: result});
        if(typeof result !== "boolean") {
            throw new Error('Function does not return a truth value.');
        }
        decreaseNest();
        debugLog(`Result: "${result}"`);

        return (!(!(result)));
    }

    isMatch(anotherCondition) {
        let aimActionFunctionString= this._conditionFunction.toString();
        let anotherConditionFunctionString = anotherCondition._conditionFunction.toString();
        let result = aimActionFunctionString === anotherConditionFunctionString;
        return result;
    }


}

module.exports = GameCondition;

