const assert = require('assert');
const Concept = require('../Concept');
const ConceptManager = require('../ConceptManager');
const ConceptFactory = require('../ConceptFactory');
const Action = require('../../Action/Action');

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
    
            it('ConceptManager makes Concept matching meaning provided', () => {
                let manager = new ConceptManager();
    
                const name = "AbilityScore";
                const meaning = { 
                    restriction: {
                        variable: manager.create("variable", {value: undefined}),
                        
                        validations: [
                            "variable.value typeof number",
                            "variable.value >= this.min",
                            "value <= this.max"
                        ],
                        min: 3,
                        max: 18,
                    }
                };
                
                let concept = manager.create(name, meaning);
    
                assert.deepEqual(concept.meaning , meaning)
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

describe('Concept', () => {
    describe('constructor', () => {
        it('Concept has correct meaning.', () => {

            //TODO redo this with as a complex of generic Concepts that actually work
            const value = undefined;

            const constants = new ConceptManager();

            const validations = new ConceptManager();

            const triggers = new ConceptManager();

            const restrictedVariable = new Concept("restrictedVariable", {value, constants, validations, triggers});

            const validate = function() {
                this.validations.forEach(check => {
                    let isValid = eval(check);
                    if(!isValid)
                        throw "Invalid Input"
                });
            };
            const validateAction = new Action("validateVariable",validate);

            //TODO add logic to ObjectManager to check on manage
            //console.log(validateAction instanceof validateAction.constructor);

            restrictedVariable.meaning.triggers.manage("onEdit", validateAction.execute);
            restrictedVariable.meaning.validations.manage("value typeof valueType");
            restrictedVariable.meaning.validations.manage("value >= valueMinimum");
            restrictedVariable.meaning.validations.manage("value <= valueMaximum");
            restrictedVariable.meaning.constants.manage("valueMinimum", 3);
            restrictedVariable.meaning.constants.manage("valueMaximum", 18);


            const concept = new Concept("Strength", restrictedVariable);
            assert.deepStrictEqual(concept.meaning, restrictedVariable) 
        });

        it('Concept containing a concept', () => {
            assert("wingwands")
        });
        
    });
    
});