/* jshint node: true, esversion: 10*/
"use strict";


const GameConcept = require('./GameConcept');
const GameSpaceManager = require('./util/GameSpaceManager');

class GameSpace extends GameConcept {
    constructor(label) {
        super(label);
        Object.assign(this.options, {
            mobility: true,
            visibility: true
        });
        this.managedSpace = new GameSpaceManager();
        //console.log({opts: this.options});
    }

    contain(object) {
        switch (true) {
            case (!(object instanceof GameConcept)):
                throw new Error("The object is not a GameConcept");
            case (!(object.isMobile)):
                throw new Error("This object is not mobile.");
            case (this.managedSpace.isFull):
                throw new Error("This space is full.");
        }
        let result = this.managedSpace.manage(object);
        //console.log({containResult: result});
        const resultKey = Object.getOwnPropertyNames(result)[0];

        return resultKey;
    }

    remove(objectKey) {
        const debugLabel = `remove(${objectKey})`;
        const debugMessage = {};
        debugMessage[debugLabel] = this.managedSpace.keys;
        //console.log(debugMessage);

        if (this.managedSpace.keys.indexOf(objectKey) === -1)
            return undefined;

        const subgameSpace = this.managedSpace.release(objectKey);
        return subgameSpace;
    }
        
    retrieve(objectKey) {
        const debugLabel = `retrieve(${objectKey})`;
        const debugMessage = {};
        debugMessage[debugLabel] = this.managedSpace.keys;
        //console.log(debugMessage);

        if(this.managedSpace.keys.indexOf(objectKey) === -1)
            return undefined;
            
        return this.managedSpace.atKey(objectKey);
    }


    static transfer(fromGameSpace, toGameSpace, scope) {
        [fromGameSpace, toGameSpace].forEach(arg => {
            if(!(arg instanceof GameSpace))
            throw new Error("transfer(...) arguments must be GameSpace objects");
        });

        //TODO implement individual scopes, right now all is only valid
        // No scope provided assumes transfer all.
        const VALID_SCOPES = [undefined, "*"];

        let isScopeValid = false;
        VALID_SCOPES.forEach(element => { 
            if(element === scope) {
                isScopeValid = true;
                return;
            }
        });

        if(!(isScopeValid)) {
            throw new Error(`Invalid scope argument provided: ${scope}`);
        }
        

        let keyMap = {};
        //console.log(fromGameSpace.describe("keys"));
        const subSpaceKeyList = fromGameSpace.describe("keys");
        subSpaceKeyList.forEach(key => {
            const releasedSubSpace = fromGameSpace.remove(key);
            const newSubSpaceKey = toGameSpace.contain(releasedSubSpace);
            keyMap[key] = newSubSpaceKey;
        });

        return keyMap;
    }

    describe(scope) {
        let description = {
            options: this.options,
            contains: this.managedSpace.list
        };

        if(scope === "keys") {
            description = Object.getOwnPropertyNames(description.contains);
        }

        if(scope === "label") {
            description = this.label;
        }
        
        return description;
    }

    get isMobile() {
        return this.options.mobility === true;
    }

    get isVisible() {
        return this.options.mobility === true;
    }

    /* TODO revisit in later version
    static createFromJSON(someGameSpaceJSON) {
        let newGameSpace = new GameSpace();
        return newGameSpace;
    }
    */
}

module.exports = GameSpace;
