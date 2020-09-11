
/* jshint node: true, esversion: 10*/
"use strict";

const ObjectManager = require('../../util/ObjectManager');
const { toAlphaNumBase } = require("../../util/BaseConverter");
class GameSpaceManager extends ObjectManager {
    constructor() {
        super();
    }

    seed() {
        let prefix = "GSPACE-";
        let seed = super.seed();
        let alphaNumSeed = toAlphaNumBase(parseInt(seed)).join("");
        let prefixedSeed = prefix + alphaNumSeed;
        return prefixedSeed;
    }
}



module.exports = GameSpaceManager;