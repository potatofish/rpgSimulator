/*jshint node: true, esversion: 9*/
"use strict";
    
// 2020-09-01 - cloned from ActionManager
// TODO finish post cloning refactoring

const ObjectManager = require('../../util/ObjectManager');
const GameRule = require('../GameRule');
//const ActionFactory = require('./ActionFactory');

class GameRuleManager extends ObjectManager {
    constructor() {
        super();
        //this._objectFactory = new ActionFactory();
    }

    manage(aRule) {
        if (!(aRule instanceof GameRule)) {
            throw new Error("GameRuleManager can only manage GameRules.")
        }
        return super.manage(aRule);
    }
/*
    create(name, method) {
        //console.log(`AM Creation: ${name} : %s`, method);
        return super.create(name, method)
    }
*/
    
    seed() {
        let prefix = "RULE-";
        let seed = super.seed();
        let hexSeed = parseInt(seed).toString(16);
        let prefixedSeed = prefix + hexSeed;
        return prefixedSeed;
    }
}
module.exports = GameRuleManager;
