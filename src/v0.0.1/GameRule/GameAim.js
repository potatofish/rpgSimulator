// 2020-08-31 - transitioned Aim to GameAim
const GameRule = require('GameRule');

class GameAim extends GameRule {
    constructor(anAction, aCondition) {
        super(anAction,aCondition)
    }
}

module.exports = GameAim;