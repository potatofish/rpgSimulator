//*jshint node: true, esversion: 9*/
"use strict";
/**
 * Action
 * any function of the Game that can be executed by a User, directly or indirectly on a 
 * User, Concept, or the execution of another Action
 */

class Action {
    //private declarations
    #name;
    #actionableFunction;
    
    constructor(name, aFunction) {
        console.log(`Action Creation: ${name} %s`, aFunction);
        if (typeof aFunction !== "function") {
            throw "Action: argument is not executable" + aFunction
        }

        this.#name = `${name}`;
        this.#actionableFunction = aFunction;
    }

    get name() {
        return this.#name;
    }

    set name(aName) {
        this.#name = `${aName}`;
    }

    execute() {
        console.log({arguments});
        console.log("#af: %s", this.#actionableFunction);
        return this.#actionableFunction.apply(null, arguments)
    }
}
module.exports = Action;
