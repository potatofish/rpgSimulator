/* jshint node: true, esversion: 10*/
"use strict";

const EventEmitter = require('events');
const UserManager = require('./util/UserManager.js');
const SimulationEventEmitter = require('./util/SimulationEventEmitter');

class GameSimulation {
    constructor() {
        throw new Error("Only a single GameSimulation. See init().")
    }

    static init() {
        let userManager = new UserManager();
        this.simulationEventEmitter = new SimulationEventEmitter();

        this.simulationEventEmitter.on('join', (aUser) => {
            console.log("for now this is THE join response");
         });

        
         this.simulationEventEmitter.emit('initialized');
    }

    static join() {
        let result = this.simulationEventEmitter.emit('join');
    }
}

module.exports = GameSimulation;
