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
        this.someSpace = new GameSpaceManager();
        //console.log({opts: this.options});
    }

    contain(object) {
        switch (true) {
            case (!(object instanceof GameConcept)):
                throw new Error("The object is not a GameConcept");
            case (!(object.isMobile)):
                throw new Error("This object is not mobile.");
            case (this.someSpace.isFull):
                throw new Error("This space is full.");
        }

        this.someSpace.manage(object);
    }

    describe() {
        return {
            options: this.options,
            contains: this.someSpace.list
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
