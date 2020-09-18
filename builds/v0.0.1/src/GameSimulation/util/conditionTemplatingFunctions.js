/* jshint node: true, esversion: 10*/
"use strict";

const GameSession = require('../../GameConcepts/GameSession.js');
const GameCondition = require('../../GameRules/GameCondition.js');
const { GameSimulation } = require("../GameSimulation");

//const module.exports = {};
/**
 */
const isAlwaysTrue = function() {
    return new GameCondition(() => { return true; });
};
//const module.exports = {};
/**
 */
const isAlwaysFalse = function() {
    return new GameCondition(() => { return false; });
};
/**
 * @param  {} neededPlayers
 */
const hasEnoughPlayers = function (neededPlayers) {
    if (typeof parseInt(neededPlayers) !== "number") {
        throw new Error(`'bad argument: ${neededPlayers}'`);
    }
    
    const functString = `return '${neededPlayers}';`;
    const neededPlayersVolume = new Function(functString);
    
    const enoughPlayers = function () {
        let playerCount = this.players.length;
        let enoughPlayers = playerCount >= neededPlayersVolume();
        return enoughPlayers;
    };
    
    return new GameCondition(enoughPlayers);
};
/**
 * @param  {} targetPhase
 */
const inCorrectPhase = function (targetPhase) {
    let tempPhaseList = Object.values(GameSession.PHASES);
    if (tempPhaseList.indexOf(targetPhase) === -1) {
        console.log({ vals: tempPhaseList, targ: (targetPhase) });
        throw new Error('invalidPhase');
    }
    
    const functString = `return '${targetPhase}';`;
    const expectedPhaseName = new Function(functString);
    
    const isPhase = function () {
        return this.activePhase.label === expectedPhaseName();
    };
    
    return new GameCondition(isPhase);
};

/**
 * @param  {} neededPlayers
 */
const hasEnoughPlayersInSetup = function (neededPlayers) {
    const functString = `return '${parseInt(neededPlayers)}';`;
    const neededPlayersVolume = new Function(functString);
    
    const enoughPlayersInSetup = function () {
        // const ctf = GameSimulation.TEMPLATES.CONDITIONS;
        let neededPlayerCount = neededPlayersVolume();
        let enoughPlayersCondition = hasEnoughPlayers(neededPlayerCount);
        let enoughPlayersResult = enoughPlayersCondition.checkAgainst(this);
        
        let phaseInSetup = inCorrectPhase(GameSession.PHASES.SETUP);
        let inSetup = phaseInSetup.checkAgainst(this);
        return hasEnoughPlayers && inSetup;
    };
    
    return new GameCondition(enoughPlayersInSetup);
};

const forEachPlayer = function(checkCondition) {
    const allPlayersChecked = function () {
        if(!(this instanceof GameSession)) {
            throw new Error(`'forEachPlayer is applied across a GameSession, this is: ${this}'`);
        }
    
        const listOfPlayerKeys = this.players;
        let trueForEach = true;
    
        listOfPlayerKeys.forEach(playerKey => {
            const player = this.getKey(playerKey);
            trueForEach = trueForEach && checkCondition.checkAgainst(player);
        });
    
        return trueForEach;
    };
    return new GameCondition(allPlayersChecked);
};
module.exports.forEachPlayer = forEachPlayer;

module.exports.isAlwaysTrue = isAlwaysTrue;
module.exports.isAlwaysFalse = isAlwaysFalse;
module.exports.hasEnoughPlayers = hasEnoughPlayers;
module.exports.inCorrectPhase = inCorrectPhase;
module.exports.hasEnoughPlayersInSetup = hasEnoughPlayersInSetup;