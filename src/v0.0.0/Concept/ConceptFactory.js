"use strict";

const ObjectFactory = require("../ObjectFactory");
const Concept = require("./Concept");

class ConceptFactory extends ObjectFactory {
    constructor(config) {
        super(config);
    }

    create(name, meaning) {
        let conceptName = name !== undefined ? name : "<New Concept>";
        let conceptMeaning = meaning !== undefined ? meaning : {};

        return new Concept(conceptName, conceptMeaning)
    }

    /**
     * TODO Add Feature: check in a prototype Concept
     * TODO Add Feature: clone prototype
     */
}

module.exports = ConceptFactory;