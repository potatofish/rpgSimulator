"use strict";

const ObjectFactory = require("../ObjectFactory");
const Concept = require("./Concept");

class ConceptFactory extends ObjectFactory {
    constructor(config) {
        super(config);
    }

    create(name, element) {
        let conceptName = name !== undefined ? name : "<New Concept>";
        let conceptElement = element !== undefined ? element : {};

        return new Concept(conceptName, conceptElement)
    }
}

module.exports = ConceptFactory;