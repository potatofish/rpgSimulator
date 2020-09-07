/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const User = require('../../src/GameSimulation/User.js');


describe('User',  () => {
    describe('constructor()', () => {
        it('A basic User can be constructed', () => {
            const userName = "aUser";
            const abasicUser = new User(userName);
            assert.ok(abasicUser instanceof User);
        });
    });
});