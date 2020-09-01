/* jshint node: true, esversion: 10*/
"use strict";

// 2020-08-31 - transitioned Action to GameAction

/**
 * GameAction
 * any function of the Game that can be executed by a User, directly or 
 * indirectly on a  User, Concept, or the execution of another Action
 */


//const GameConcept = require(../GameConcept)
class GameAction {
     constructor(aFunction, targetList) {
        //validate arguments
        if (typeof aFunction !== "function") {
            throw "Action: primary argument is not a function." + aFunction;
        }

        if (!Array.isArray(targetList)) {
            throw "Action: secondary argument is not an array" + aFunction;
        }

        this.action = aFunction;
        this.targetList = [];
        targetList.forEach(target => {
            //TODO validate that all targets are GameConcepts
            this.targetList.push(target);
        });
    }
    get action() {
        return this.action;
    }

    get targetList() {
        return this.targetList;
    }
}
module.exports = GameAction;
