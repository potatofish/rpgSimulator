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

                console.log({templateCopy});
                Object.values(templateCopy).forEach((aim) => {
                    assert(aim instanceof GameAim);
                });
            });

            it("ActivePlay Action works on a new session", () => {
           
                let transitionToActive = GameSimulation.TEMPLATES.RULES.basicPhaseTransitionAims(GameSession.PHASES.ACTIVE);

                assert(transitionToActive instanceof GameAim);
                
                let action = transitionToActive.action;
                const sysLabel = "Dangons & Drungeons";
                let ags = new GameSession(new GameSystem(sysLabel));
                assert(ags.activePhase.label === GameSession.PHASES.SETUP);
                
                action.applyTo(ags);
                assert(ags.activePhase.label === GameSession.PHASES.ACTIVE);
            });
        });
    });
});


