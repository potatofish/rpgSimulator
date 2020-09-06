/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GameSimulation = require('../../src/GameSimulation/GameSimulation.js');
const { EventEmitter } = require('events');

describe('GameSimulation',  () => {
    describe('init()', () => {
        it('The GameSimulation can be initialized', (done) => {
            const anEventEmitter = new EventEmitter();
            let eventHasFired = false;
            setTimeout(function () {
                console.log({timeout: eventHasFired});
                assert(eventHasFired, 'Event did not fire in 1000 ms.');
                done();
            }, 1000);

            GameSimulation.init();
            anEventEmitter.on('initialized',() => {
                eventHasFired = true;
                console.log({init: eventHasFired});
            });
        });
    });
});