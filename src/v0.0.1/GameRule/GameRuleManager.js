/*jshint node: true, esversion: 9*/
"use strict";
    
// 2020-09-01 - cloned from ActionManager
// TODO finish post cloning refactoring

const ObjectManager = require('../ObjectManager');
const ActionFactory = require('./ActionFactory');

class ActionManager extends ObjectManager {
    constructor(config) {
        super(config);
        this._objectFactory = new ActionFactory();
    }

    create(name, method) {
        //console.log(`AM Creation: ${name} : %s`, method);
        return super.create(name, method)
    }
    
    seed() {
        let prefix = "ACTION-"
        let seed = super.seed();
        let hexSeed = parseInt(seed).toString(16);
        let prefixedSeed = prefix + hexSeed;
        return prefixedSeed;
    }

}
module.exports = ActionManager;
