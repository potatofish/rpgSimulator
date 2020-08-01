const assert = require('assert');
const Concept = require('../Concept');
const ConceptManager = require('../ConceptManager');
const ConceptFactory = require('../ConceptFactory');

describe('ConceptManager', () => {
    describe('constructor()', () => {
        it('ConceptManager has an ConceptFactory to make Concepts with', () => {
            let manager = new ConceptManager();
            let factory = manager._objectFactory;

            let factoryIsForConcepts = factory instanceof ConceptFactory;

            assert.ok(factoryIsForConcepts);
        });

        describe("create()", () => {
            it("ConceptManager can make Concepts", ()=> {
                let manager = new ConceptManager();
                
                let object = manager.create();
    
                let objectIsConcept = object instanceof Concept;
    
                assert.ok(objectIsConcept);
            });
    
            it('ConceptManager makes Concept matching element provided', () => {
                let manager = new ConceptManager();
    
                const conceptName = "AbilityScore";
                const conceptElement = {
                    validations: [
                        "value typeof number",
                        "value >= this.min",
                        "value <= this.max"
                    ],
                    min: 3,
                    max: 18,
                    value: undefined
                };
                
                let concept = manager.create(conceptName, conceptElement);
    
                assert.deepEqual(concept.element , conceptElement)
            });
    
            it('ConceptManager makes Concept matching name provided', () => {
                let manager = new ConceptManager();
    
                const conceptName = "Strength";
                
                let concept = manager.create(conceptName, {});
    
                assert.equal(conceptName, concept.name);
            });
    
            it('ConceptManager makes Concept matching (only) name provided', () => {
                let manager = new ConceptManager();
    
                const conceptName = "Strength";
                
                let concept = manager.create(conceptName);
    
                assert.equal(conceptName, concept.name);
            });
        });
    });
    
});