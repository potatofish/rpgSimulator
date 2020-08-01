//*jshint node: true, esversion: 9*/
"use strict";

const ObjectManager = require('../ObjectManager');
const ConceptFactory = require('./ConceptFactory');

class ConceptManager extends ObjectManager {
    constructor(config) {
        super(config);
        this._objectFactory = new ConceptFactory();
    }

    create(name, element) {
        return super.create(name, element);
    }

    seed() {
        let prefix = "CONCEPT-"
        let seed = super.seed();
        let hexSeed = parseInt(seed).toString(16);
        let prefixedSeed = prefix + hexSeed;
        return prefixedSeed
    }
}
module.exports = ConceptManager;