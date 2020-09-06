/*jshint node: true, esversion: 9*/
"use strict";
    
// 2020-09-01 - cloned from ActionManager
// TODO finish post cloning refactoring

const ObjectManager = require('../../util/ObjectManager');
const User = require('../User');
//const ActionFactory = require('./ActionFactory');

class UserManager extends ObjectManager {
    constructor() {
        super();
        //this._objectFactory = new ActionFactory();
    }

    manage(aUser) {
        if (!(aUser instanceof User)) {
            throw new Error("UserManager can only manage Users.")
        }
        return super.manage(aUser);
    }
/*
    create(name, method) {
        //console.log(`AM Creation: ${name} : %s`, method);
        return super.create(name, method)
    }
*/
    
    seed() {
        let prefix = "USER-";
        let seed = super.seed();
        let hexSeed = parseInt(seed).toString(16);
        let prefixedSeed = prefix + hexSeed;
        return prefixedSeed;
    }
}
module.exports = UserManager;
