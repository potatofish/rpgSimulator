/* jshint node: true, esversion: 10*/
"use strict";

const EventEmitter = require('events');
const UserManager = require('./util/UserManager.js');
const SimulationEventEmitter = require('./util/SimulationEventEmitter');

class GameSimulation {
    constructor() {
        this.userManager = new UserManager();
        this.simulationEventEmitter = new SimulationEventEmitter();

        this.simulationEventEmitter.on('join', (aUser) => {
            console.log("for now this is THE join response for a user!");
         });

        this._options = {
            initialized : false
        };

    }

    init() {        
        this._options = {
            initialized : true
        };
    }

    join(aUser) {
        if(!(this.isInitialized)) {
            let errorMessage = 
                "Not yet initialized. Try init().";
            throw new Error(errorMessage);
        }
        let joinResult = this.simulationEventEmitter.emit('join');
    }

    get isInitialized() {
        return this._options.initialized === true;
    }


}

module.exports = GameSimulation;
