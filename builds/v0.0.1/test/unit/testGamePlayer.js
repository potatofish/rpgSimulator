/*jshint node: true, esversion: 9*/
"use strict";

const assert = require('assert');
const GamePlayer = require('../../src/GameConcepts/GamePlayer.js');
const User = require('../../src/GameSimulation/User.js');
//test/unit/TEST_TEMPLATES.js


const TEST_TEMPLATES = require('./TEST_TEMPLATES');

describe('GamePlayer',  () => {
    describe('constructor()', () => {
        it('A basic GamePlayer can be constructed', () => {
            const [user, player] = makeInitialObjects();
            assert.ok(player instanceof GamePlayer);
        });

        it('A GamePlayer is default-named after their user', () => {
            const [user, player] = makeInitialObjects();
            const failMessage = `${user.name} is not ${player.label}`;
            assert(user.name === player.label, failMessage);
        }); 
        
        it('A GamePlayer is named with the user provided string', () => {
            const [user, player] = makeInitialObjects();

            const playerName = "Player#"+Date.now();

            const userNamedPlayer = new GamePlayer(user, `${playerName}`);

            const failMessages = {}; 
            failMessages.A = `${playerName} is not ${player.label}`;
            assert(playerName === userNamedPlayer.label, failMessages.A);
                        
            failMessages.B = `${player.label} is not owned by ${user.name}`;
            assert(player.belongsTo(user), failMessages.B);
            
            failMessages.C = `${userNamedPlayer.label} is not owned by ${user.name}`;
            assert(userNamedPlayer.belongsTo(user), failMessages.C);
        }); 

    });
    describe("take() & possess()", () => {
        it('A GamePlayer can take items', () => {

        });
        it("A GamePlayer possesses items they've taken", () => {});
       
    });
});

function makeInitialObjects() {
    const userName = TEST_TEMPLATES.LABELS.USER;
    const user = new User(userName);
    const player = new GamePlayer(user);
    return [user, player];
}
