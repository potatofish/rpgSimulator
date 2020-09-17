/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');

const { AssertionError } = require('assert');
const GameAim = require('../../src/GameRules/GameAim.js');
const User = require('../../src/GameSimulation/User.js');
const TicTacToeSystem = require("./TicTacToeSystem");
const tta = require("./ticTacToeAims");



describe('tictactoe', () => {
    describe('aimTostartActivePlay()', () => {
        it('The tictactoe aimTostartActivePlay functions', () => {
            var tttRulesSystem = new TicTacToeSystem();
            const startActivePlayAim = tta.aimTostartActivePlay();

            console.log({aims: tttRulesSystem.aims});
            console.log({startActivePlayAim});

            Object.entries(tttRulesSystem.aims).forEach(ruleSystemAim => {
                const [aimKey, aimValue] = ruleSystemAim; 
                console.log({aimKey, aimValue, truth: aimValue === startActivePlayAim});
                console.log({aimAction: aimValue.action, startActiveAction: startActivePlayAim.action, truth: aimValue.action === startActivePlayAim.action});
                console.log({aimActionFunction: aimValue.action._actionFunction, startActiveActionFunction: startActivePlayAim.action._actionFunction, truth: aimValue.action._actionFunction === startActivePlayAim.action._actionFunction});
                console.log({aimActionFunctionTS: aimValue.action._actionFunction.toString(), startActiveActionFunctionTS: startActivePlayAim.action._actionFunction.toString(), truth: aimValue.action._actionFunction.toString() === startActivePlayAim.action._actionFunction.toString()});
            });

            const aimFromRuleSystem = tttRulesSystem.find(startActivePlayAim);
            //console.log({found});
            
            assert(startActivePlayAim !== undefined);
            assert(startActivePlayAim instanceof GameAim);
            assert(aimFromRuleSystem.isMatch(startActivePlayAim), "not equal");
            assert.equal(aimFromRuleSystem, startActivePlayAim, "not equal");
            assert.deepEqual(aimFromRuleSystem, startActivePlayAim, "not deep equal");
            assert.deepStrictEqual(aimFromRuleSystem, startActivePlayAim, "not deep strict equal");
        });
    });
});




