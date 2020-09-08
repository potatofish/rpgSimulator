/*jshint node: true, esversion: 9*/
"use strict";


// 2020-08-31 - transitioned Aim to GameAim
const GameRule = require('./GameRule.js');

class GameAim extends GameRule {
    constructor(anAction, aCondition) {
        super(anAction, aCondition);
    }
}

module.exports = GameAim;