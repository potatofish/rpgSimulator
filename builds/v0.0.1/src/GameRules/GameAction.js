/* jshint node: true, esversion: 10*/
"use strict";


// 2020-08-31 - transitioned Action to GameAction

/**
 * GameAction
 * any function of the Game that can be executed by a User, directly or 
 * indirectly on a  User, Concept, or the execution of another Action
 */


const GameConcept = require('../GameConcepts/GameConcept');
const GameSpace = require('../GameConcepts/GameSpace');


class GameAction {
     constructor(aFunction) {
        //validate arguments
        if (typeof aFunction !== "function") {
            throw new Error(`aFunction is not a function. ${aFunction}`);
        }
        //console.log({aFunction: aFunction});
        this._actionFunction = aFunction;
//        this.targetableAction2 = aFunction.bind(this.targetableAction3);

        /*
        console.debug({
             onNew: {
                     1: this.actionFunction//, 
                     //2: this.targetableAction2, 
                    // 3: this.targetableAction3
        }});
        */


    }
    get actionFunction() {
        /*
        console.debug({
            onGet: {
                    1: this.actionFunction//, 
                    //2: this.targetableAction2, 
                    //3: this.targetableAction3
       }});
       */
        return this._actionFunction;
    }

    applyTo(target) {
        if(!(target instanceof GameSpace)) {
            throw new Error('Target of application is not GameSpace');
        }
        // console.log({GAApplyTo: target});
        let boundActionFunction = this._actionFunction.bind(target);
        const result = boundActionFunction();
        return result;
    }

}
module.exports = GameAction;
