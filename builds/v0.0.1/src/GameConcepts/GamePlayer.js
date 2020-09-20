/* jshint node: true, esversion: 10*/
"use strict";

const GameSpace = require('./GameSpace');
const User = require('../GameSimulation/User');

class GamePlayer extends GameSpace {
    constructor(aUser, aName) {
        if (!(aUser instanceof User)) {
            throw new Error("GamePlayers require a User");
        } 
        let playerName = aName;
        if(aName === undefined) { 
            playerName = aUser.name;
        }
        super(playerName);

        this._owner = aUser;

    }

    get name() {
        return this.label;
    }

    // TODO make possessions a specific subset of players' managed space
    take(target) {
        return this.contain(target);
    }

    possesses(target) {
        let targetKeys = this.managedSpace.keysOf(target);
        return targetKeys !== undefined && targetKeys.length > 0;
    }
    
    get inventory() {
        let inventoryKeys = this.managedSpace.keys;
        let inventory = {contents: {}, size: 0};
        inventoryKeys.forEach((key) => {
            let item = this.managedSpace.atKey(key);
            if(inventory.contents[item.label] === undefined){
                inventory.contents[item.label] = [];
            }
            inventory.contents[item.label].push(item);
        });
        inventory.size = inventoryKeys.length;

        return inventory;

    }

    show(item) {
        let itemKey = this.managedSpace.strictKeyOf(item);
    }

    giveUp(item) {
        let givenUpItem = this.show(item);
    }

    belongsTo(aUser) {
        if(!(aUser instanceof User)) {
            throw new Error('Only Users can own players');
        }
        // console.log({expected: aUser.uniqueID, actual: this.ownerID});
        return aUser.uniqueID === this.ownerID;
    }

    get ownerID() {
        return this._owner.uniqueID;
    }
}

module.exports = GamePlayer;
