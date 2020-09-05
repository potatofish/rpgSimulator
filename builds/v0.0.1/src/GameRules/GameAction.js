/* jshint node: true, esversion: 10*/
"use strict";


// 2020-08-31 - transitioned Action to GameAction

/**
 * GameAction
 * any function of the Game that can be executed by a User, directly or 
 * indirectly on a  User, Concept, or the execution of another Action
 */


const GameConcept = require('../GameConcepts/GameConcept');

class GameAction {
     constructor(aFunction) {
        //validate arguments
        if (typeof aFunction !== "function") {
            throw new Error(`aFunction is not a function. ${aFunction}`);
        }
        console.log({aFunction: aFunction});
        this.targetableAction = aFunction;
        this.targetableAction.bind(aFunction);

        console.log({targetableActionC: this.targetableAction});


    }
    get action() {
        console.log({targetAbleActionG: this.targetAbleAction});
        return this.targetAbleAction;
    }
}
module.exports = GameAction;
