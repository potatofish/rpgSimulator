/* jshint node: true, esversion: 10*/
"use strict";

const EventEmitter = require('events');

class SimulationEventEmitter extends EventEmitter {
    constructor() {
        super();
    }
}
module.exports = SimulationEventEmitter;