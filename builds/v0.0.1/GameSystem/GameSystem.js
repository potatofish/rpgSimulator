/*jshint node: true, esversion: 9*/
"use strict";

const { GameRuleManager } = require("../GameRule");

// 2020-08-31 - transitioned System to GameSystem
class GameSystem {
    constructor() {
        this.#ruleManager = new GameRuleManager();
    }

    get rules() {
        return this.#ruleManager.list();
    }

    get aims() {
        return this.#ruleManager.listAims();
    }

    add(aNewRule) {
    }

    find(existingRule) {

    }

    remove(existingRule) {

    }
}
exports.GameSystem = GameSystem;
