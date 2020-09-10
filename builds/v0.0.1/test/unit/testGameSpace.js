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
            const aGameSpacePrimary = new GameSpace("Primary");
            const aGameSpaceSecondary = new GameSpace("Secondary");
            aGameSpacePrimary.contain(aGameSpaceSecondary);
            
            let contentsOfPrimary = aGameSpacePrimary.describe().contains;
            let secondaryKey = Object.getOwnPropertyNames(contentsOfPrimary);
            
            //console.debug(contentsOfPrimary[secondaryKey]);
            
            assert.ok(contentsOfPrimary[secondaryKey] instanceof GameSpace);
        });

        it('A GameSpace can have some of it contents removed.', () => {
        });
        
        it('A GameSpace can transfer contents to another GameSpace', () => {
        });

    });
});