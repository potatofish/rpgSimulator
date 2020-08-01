//*jshint node: true, esversion: 9*/
"use strict";

const ObjectFactory = require('../ObjectFactory');
const Action = require('./Action');

class ActionFactory extends ObjectFactory {
    constructor(config) {
        console.log("ActionFactory Made");
        super(config);
    }

    create(name, method) {
        console.log(`AF Create ${name}: %s`, method);
        let actionName = name !== undefined ? name : "<New Action>";
        let actionMethod = method !== undefined ? method : () => {};

        return new Action(actionName, actionMethod);
    }
}

//console.log("%s", ActionFactory);
module.exports = ActionFactory;
