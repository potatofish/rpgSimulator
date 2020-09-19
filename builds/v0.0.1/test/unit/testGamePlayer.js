/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');
const GameSpace = require('../../src/GameConcepts/GameSpace.js');
const User = require('../../src/GameSimulation/User.js');
//test/unit/TEST_TEMPLATES.js


const TEST_TEMPLATES = require('./TEST_TEMPLATES');

describe('GamePlayer',  () => {
    describe('constructor()', () => {
        it('A basic GamePlayer can be constructed', () => {
            const [user, player] = makeTemplateObjects();
            assert.ok(player instanceof GamePlayer);
        });

        it('A GamePlayer is default-named after their user', () => {
            const [user, player] = makeTemplateObjects();
            const failMessage = `${user.name} is not ${player.label}`;
            assert(user.name === player.label, failMessage);
        }); 
        
        it('A GamePlayer is named with the user provided string', () => {
            const [user, player] = makeTemplateObjects();
            const altPlayerName = "Player#"+Date.now();
            const altPlayer = new GamePlayer(user, `${altPlayerName}`);
            
            const failMessages = {}; 
            failMessages.A = `${altPlayerName} is not ${player.label}`;
            assert(altPlayerName === altPlayer.label, failMessages.A);
            
            failMessages.B = `${player.label} is not owned by ${user.name}`;
            assert(player.belongsTo(user), failMessages.B);
            
            failMessages.C = `${altPlayer.label} is not owned by ${user.name}`;
            assert(altPlayer.belongsTo(user), failMessages.C);
        }); 
        
    });
    describe("take() & possesses()", () => {
        it('A GamePlayer can take items, possessing them', () => {
            const [user, player, item] = makeTemplateObjects();
            const failMessages = {}; 
            failMessages.A = `${player.label} has ${item.label}`;
            assert(!(player.possesses(item)), failMessages.A);
            
            player.take(item);
            failMessages.B = `${player.label} does not have ${item.label}`;
            assert(player.possesses(item), failMessages.B);

            const junkItem = new GameSpace("JUNK");
            failMessages.C = `${player.label} has ${junkItem.label}`;
            assert(!(player.possesses(junkItem)), failMessages.C);
        });
    });
});

function makeTemplateObjects() {
    const userName = TEST_TEMPLATES.LABELS.USER;
    const user = new User(userName);
    const player = new GamePlayer(user);
    const item = new GameSpace(TEST_TEMPLATES.LABELS.ITEM);
    return [user, player, item];
}
