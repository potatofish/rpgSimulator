/*jshint node: true, esversion: 9*/
"use strict";

class GameConcept {
    constructor() {
        this.options = {
            targetablity : true
        };
    }

    get isTargetable() {
        return this.options.targetablity === true;
    }
}

module.exports = GameConcept;
