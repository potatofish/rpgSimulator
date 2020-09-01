/*jshint node: true, esversion: 9*/
"use strict";
    
// 2020-09-01 - cloned from ActionFactory
// TODO finish post cloning refactoring
const ObjectFactory = require('../ObjectFactory');
const Action = require('./GameAction');

class ActionFactory extends ObjectFactory {
    constructor(config) {
        //console.log("ActionFactory Made");
        super(config);
    }

    create(name, method) {
        //console.log(`AF Create ${name}: %s`, method);
        let actionName = name !== undefined ? name : "<New Action>";
        let actionMethod = method !== undefined ? method : () => {};

        return new Action(actionName, actionMethod);
    }
}

//console.log("%s", ActionFactory);
module.exports = ActionFactory;
