/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSpace = require('../../src/GameConcepts/GameSpace.js');

describe('GameSpace',  () => {
    describe('constructor()', () => {
        it('A basic GameSpace can be constructed', () => {
            const abasicGameSpace = new GameSpace("Basic");
            assert.ok(abasicGameSpace instanceof GameSpace);
        });

        it('A GameSpace can contain other GameSpaces', () => {
            const aGameSpaceParent = new GameSpace("Parent");
            const aGameSpaceSecondary = new GameSpace("Secondary");
            aGameSpaceParent.contain(aGameSpaceSecondary);
            
            let contentsOfParent = aGameSpaceParent.describe().contains;
            let secondaryKey = Object.getOwnPropertyNames(contentsOfParent);
            
            //console.debug(contentsOfParent[secondaryKey]);
            
            assert.ok(contentsOfParent[secondaryKey] instanceof GameSpace);
            assert.deepStrictEqual(contentsOfParent[secondaryKey], aGameSpaceSecondary)
        });
        
        it('A GameSpace can have some of it contents removed.', () => {
            const parentSpace = new GameSpace("Parent");
            const childSpace = new GameSpace("Secondary");
            parentSpace.contain(childSpace);

            let childSpaceKey = parentSpace.contain(childSpace);
            
            assert(parentSpace.retrieve(childSpaceKey) instanceof GameSpace);
            assert.deepStrictEqual(parentSpace.retrieve(childSpaceKey), childSpace)

            const removedSpace = parentSpace.remove(childSpaceKey);

            assert(parentSpace.retrieve(childSpaceKey) === undefined);
            assert.deepStrictEqual(removedSpace, childSpace)
            
        });
        
        it('A GameSpace can transfer contents to another GameSpace', () => {
            const firstParentSpace = new GameSpace("Parent (First)");
            const secondParentSpace = new GameSpace("Parent (Second)");
            const childSpace = new GameSpace("Child");
            
            let childSpaceKey = firstParentSpace.contain(childSpace);
            
            
            console.log({"label": "before", key: childSpaceKey, "1st" : firstParentSpace.retrieve(childSpaceKey), "2nd" : secondParentSpace.retrieve(childSpaceKey)});

            //let contentsOfParent = firstParentSpace.describe().contains;
            //let secondaryKey = Object.getOwnPropertyNames(contentsOfParent);
        
            assert(firstParentSpace.retrieve(childSpaceKey) instanceof GameSpace);
            assert.deepStrictEqual(firstParentSpace.retrieve(childSpaceKey), childSpace)
        
            GameSpace.transfer(firstParentSpace, secondParentSpace);

            console.log({"label": "before", key: childSpaceKey, "1st" : firstParentSpace.retrieve(childSpaceKey), "2nd" : secondParentSpace.retrieve(childSpaceKey)});

            // const removedSpace = aGameSpaceParent.remove(secondaryKey);
        
            // assert(contentsOfParent[secondaryKey] === undefined);
            // assert.deepStrictEqual(removedSpace, aGameSpaceSecondary)
        });
        
    });
});