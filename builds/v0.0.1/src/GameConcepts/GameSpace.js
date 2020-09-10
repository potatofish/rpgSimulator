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

        return result;
    }

    remove(objectKey) {
        console.log({spaceKeys: this.managedSpace.keys});
        if(this.managedSpace.keys.indexOf(objectKey) === -1)
            throw new Error("Temp Junk");
        const subgameSpace = this.managedSpace.release(objectKey);
        return subgameSpace;
    }

    static transfer(fromGameSpace, toGameSpace) {
        Object.values(arguments).forEach(arg => {
            if(!(arg instanceof GameSpace))
            throw new Error("transfer(...) arguments must be GameSpace objects")
        });

        const subSpaceKeyList = fromGameSpace.managedSpace.keys;
        subSpaceKeyList.forEach(key => {
            const releasedSubSpace = this.activePhase.release(key);
            toGameSpace.contain(releasedSubSpace);
        });
    }

    describe() {
        return {
            options: this.options,
            contains: this.managedSpace.list
        };
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
