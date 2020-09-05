/*jshint node: true, esversion: 9*/
"use strict";

const GameRuleManager = require("./util/GameRuleManager");
const ObjectManager = require('../util/ObjectManager');

// 2020-08-31 - transitioned System to GameSystem
class GameSystem {
    constructor() {
        this.ruleManager = new GameRuleManager();
    }

    get rules() {
        return this.ruleManager.list();
    }

    get aims() {
        return this.ruleManager.listAims();
    }

    add(aNewRule) {
        return this.ruleManager.manage(aNewRule);
    }

    lookup(ruleKey) {
        if (typeof ruleKey !== "string") {
            throw new Error("Rule index key must be a string.")
        }
        return this.ruleManager.atKey(ruleKey);
    }

    find(existingRule) {

    }

    remove(existingRule) {

    }
}

module.exports = GameSystem;