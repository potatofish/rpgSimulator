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
            assert.deepStrictEqual(contentsOfParent[secondaryKey], aGameSpaceSecondary);
        });
        
        it('A GameSpace can have some of it contents removed.', () => {
            const parentSpace = new GameSpace("Parent");
            const childSpace = new GameSpace("Secondary");
            parentSpace.contain(childSpace);

            let childSpaceKey = parentSpace.contain(childSpace);
            
            assert(parentSpace.retrieve(childSpaceKey) instanceof GameSpace);
            assert.deepStrictEqual(parentSpace.retrieve(childSpaceKey), childSpace);

            const removedSpace = parentSpace.remove(childSpaceKey);

            assert(parentSpace.retrieve(childSpaceKey) === undefined);
            assert.deepStrictEqual(removedSpace, childSpace);
            
        });
        
        it('A GameSpace can transfer all its contents to another GameSpace', () => {
            const firstParentSpace = new GameSpace("Parent (First)");
            const secondParentSpace = new GameSpace("Parent (Second)");
            const childSpace = new GameSpace("Child");
            
            let initialChildSpaceKey = firstParentSpace.contain(childSpace);
            
          
            const childFromFirstParent = firstParentSpace.retrieve(initialChildSpaceKey) ;
            assert(childFromFirstParent instanceof GameSpace, "Child is not a GameSpace");
            assert.deepStrictEqual(childFromFirstParent, childSpace, "Childspace is not the same");
            
            // console.log({fps: firstParentSpace.managedSpace, sps: secondParentSpace.managedSpace, });
            
            const keyMap = GameSpace.transfer(firstParentSpace, secondParentSpace);
            const newChildSpaceKey = keyMap[initialChildSpaceKey];
            
            // console.log({fps: firstParentSpace.managedSpace, sps: secondParentSpace.managedSpace});
            
            const childFromSecondParent = secondParentSpace.retrieve(newChildSpaceKey) ;
            assert(childFromSecondParent instanceof GameSpace, `Child is not a GameSpace: ${childFromSecondParent}`);
            assert.deepStrictEqual(childFromSecondParent, childSpace, `Childspaces are no longer the same ${childFromSecondParent, childSpace}`);

            const childFromFirstParentAgain = firstParentSpace.retrieve(initialChildSpaceKey) ;
            assert(childFromFirstParentAgain === undefined, `Childspace was not removed from first Parent: ${childFromFirstParentAgain}`);
        });
        
    });
});