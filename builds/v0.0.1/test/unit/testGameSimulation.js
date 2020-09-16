/*jshint node: true, esversion: 9*/
"use strict";
const assert = require('assert');
const { testNewIsNotInit } = require("./testGameSimulation/testNewIsNotInit");
const { testSystemLoadable } = require("./testGameSimulation/testSystemLoadable");
const { testSessionStartable } = require("./testGameSimulation/testSessionStartable");
const { testSessionJoinable } = require("./testGameSimulation/testSessionJoinable");


const { testChangeActivePhaseByRule } = require("./testGameSimulation/testChangeActivePhaseByRule.js");
const { testSystemUser } = require("./testGameSimulation/testSystemUser");
const GameSimulation = require("../../src/GameSimulation/GameSimulation");
const GameAim = require("../../src/GameRules/GameAim");
const GameSession = require('../../src/GameConcepts/GameSession');
const GameSystem = require('../../src/GameRules/GameSystem');

describe('GameSimulation', () => {
    describe('constructor()', () => {
        it('The GameSimulation constructs uninitialized', testNewIsNotInit);

        it('An initialized GameSimulation can load a GameSystem', testSystemLoadable);

        it('A loaded GameSimulation can start a GameSession', testSessionStartable); 

        it('A started GameSimulation Session can be joined', testSessionJoinable); 
        
        it('A started GameSimulation Session can be played', testChangeActivePhaseByRule); 
    });

    describe("ruleTemplatingFunctions", () => {
        describe("basicPhaseTransitionAims", () => {
            it("3 GameAims are returned", () => {
                let templateCopy = GameSimulation.TEMPLATES.RULES.basicPhaseTransitionAims();

                templateCopy.forEach((aim) => {
                    assert(aim instanceof GameAim);
                    console.log({aim});
                    let action = aim.action;
                    let actionFunct = action.actionFunction;
                    const sysLabel = "Dangons & Drungeons";
                    //console.log({actionFunct: `${actionFunct}`});

                    let ags = new GameSession(new GameSystem(sysLabel));
                    action.applyTo(ags);
                    console.log({ap: ags.activePhase.label});
                });
            });
        });
    });
});


