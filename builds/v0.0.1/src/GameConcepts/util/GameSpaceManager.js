
/* jshint node: true, esversion: 10*/
"use strict";

const emojis = require('emojis-list')

function toEmojiBase(aNumber) {
    if (typeof aNumber !== "number")
        throw new Error(`This '${aNumber}'is not a number!`);

    // CONVERTING FROM BASE 10 TO BASE B: ANOTHER METHOD
    const emojiBaseSize = emojis.length;
    
    // Find the highest power of the base b that will divide into the given number at least once and then divide.
    let highestPower = 0;
    while(1) {
        let nextPowerOfBase = emojiBaseSize**(highestPower+1);
        if(nextPowerOfBase > aNumber) {
            break;
        }
        highestPower++;
    }

    // Keep the whole number part, and multiply the fractional part by the base b.
    let fractional = Math.floor(aNumber / (emojiBaseSize**(highestPower)));
    let newNumber = aNumber - fractional;
    let emojiChosen = emojis[fractional];

    console.log({aNumber, newNumber, fractional, emojiChosen});

    //TODO make the above recursive
    // Repeat step two, keeping the whole number part (including 0), carrying the fractional part to the next step until only a whole number result is obtained.
    // Collect all your whole number parts to get your number in base b notation.

}

const ObjectManager = require('../../util/ObjectManager');
class GameSpaceManager extends ObjectManager {
    constructor() {
        super();
    }

    seed() {
        let prefix = "SPACE-";
        let seed = super.seed();
        console.log({seed: seed, seedLength: seed.length, emojiLength: emojis.length, index: seed % emojis.length});
        toEmojiBase(parseInt(seed));
        let hexSeed = parseInt(seed).toString(16);
        let prefixedSeed = prefix + hexSeed;
        return prefixedSeed;
    }
}



module.exports = GameSpaceManager;