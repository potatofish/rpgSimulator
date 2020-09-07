/* jshint node: true, esversion: 10*/
"use strict";

class GameCondition {
    constructor(aTruthFunction) {

        //validate arguments
        if (typeof aTruthFunction !== "function") {
            throw new Error(`aTruthFunction is not a function. ${aTruthFunction}`);
        }

        this._truthFunction = aTruthFunction;
    }

    get truthFunction() {
        return this._truthFunction;
    }


}

module.exports = GameCondition;
