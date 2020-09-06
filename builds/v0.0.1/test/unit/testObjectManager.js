/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const ObjectManager = require('../../src/util/ObjectManager.js');

describe('ObjectManager',  () => {
    describe('constructor()', () => {
        it('A basic ObjectManager can be constructed', () => {
            const abasicObjectManager = new ObjectManager();
            assert.ok(abasicObjectManager instanceof ObjectManager);
        });
    });
});