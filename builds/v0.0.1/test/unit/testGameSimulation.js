/*jshint node: true, esversion: 9*/
"use strict";

const { testChangePhaseByRule } = require("./testGameSimulation/testChangePhaseByRule");
const { testSystemUser } = require("./testGameSimulation/testSystemUser");
const { testSessionJoinable } = require("./testGameSimulation/testSessionJoinable");
const { testSessionStartable } = require("./testGameSimulation/testSessionStartable");
const { testSystemLoadable } = require("./testGameSimulation/testSystemLoadable");
const { testNewIsNotInit } = require("./testGameSimulation/testNewIsNotInit");

describe('GameSimulation', () => {
    describe('constructor()', () => {
        it('The GameSimulation constructs uninitialized', testNewIsNotInit);

        it('An initialized GameSimulation can load a GameSystem', testSystemLoadable);

        it('A loaded GameSimulation can start a GameSession', testSessionStartable); 

        it('A started GameSimulation Session can be joined', testSessionJoinable); 
    });

    describe("this.systemUser", () => {
        // it("Initializing starts the asynchronous systemuser process", testSystemUser);
    });
});


