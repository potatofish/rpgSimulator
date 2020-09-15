/*jshint node: true, esversion: 9*/
"use strict";

const { testNewIsNotInit } = require("./testGameSimulation/testNewIsNotInit");
const { testSystemLoadable } = require("./testGameSimulation/testSystemLoadable");
const { testSessionStartable } = require("./testGameSimulation/testSessionStartable");
const { testSessionJoinable } = require("./testGameSimulation/testSessionJoinable");


const { testChangeActivePhaseByRule } = require("./testGameSimulation/testChangeActivePhaseByRule");
const { testSystemUser } = require("./testGameSimulation/testSystemUser");

describe('GameSimulation', () => {
    describe('constructor()', () => {
        it('The GameSimulation constructs uninitialized', testNewIsNotInit);

        it('An initialized GameSimulation can load a GameSystem', testSystemLoadable);

        it('A loaded GameSimulation can start a GameSession', testSessionStartable); 

        it('A started GameSimulation Session can be joined', testSessionJoinable); 
        
        it('A started GameSimulation Session can be played', testChangeActivePhaseByRule); 
    });

    describe("this.systemUser", () => {
        // it("Initializing starts the asynchronous systemuser process", testSystemUser);
    });
});


