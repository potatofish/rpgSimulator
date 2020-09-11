
/* jshint node: true, esversion: 10*/
"use strict";

function toArrayBase(numberToConvert, anArray) {
    if (typeof numberToConvert !== "number") { 
        throw new Error(`This '${numberToConvert}'is not a number!`); 
    }

    if (!(Array.isArray(anArray))) { 
        throw new Error(`This '${anArray}'is not an Array!`); 
    }

    anArray.forEach(digit => {
        if(anArray.indexOf(digit) !== anArray.lastIndexOf(digit)) { 
            throw new Error(`The has duplicate digits! See ${digit}`); 
        }
    });

    
    // CONVERTING FROM BASE 10 TO BASE B: ANOTHER METHOD
    const sizeOfBaseB = anArray.length;

    // Find the highest power of the base b that will divide into 
    // the given number.
    let highestPower = 0;
    while (1) {
        let nextPowerOfBase = sizeOfBaseB ** (highestPower + 1);
        if (nextPowerOfBase > numberToConvert) {
            break;
        }
        highestPower++;
    }

    let remainingToConvert = numberToConvert;
    let convertedDigits = [];
    let debugLog = {sizeOfBaseB};

    for (let power = highestPower; power >= 0; power--) {
        const baseToPower = sizeOfBaseB ** (power);
        // divide the number by the the base to the highest power evenly
        let quantity = Math.floor(remainingToConvert / baseToPower);
        
        // Use as the index of the next most precision digit for 
        // the converted number
        let digitChosen = anArray[quantity];
        convertedDigits.push(digitChosen);
        const remainder = remainingToConvert - (quantity*baseToPower);

        debugLog[power] = {
            remainingToConvert, baseToPower, quantity, digitChosen, convertedNumber: convertedDigits, remainder
        };
        
        remainingToConvert = remainder;
    }
    
    //console.log({debugLog});
    console.log({ convertedNumber: convertedDigits });
    return convertedDigits;
    
    //TODO make the above recursive
}

exports.toArrayBase = toArrayBase;

exports.toEmojiBase = function (aNumber) {
    const emojiArray = require('emojis-list');
    const convertedDigits = toArrayBase(aNumber, emojiArray);

    return convertedDigits;
};

exports.toEmojiUnicodeBase = function (aNumber) {
    const emojiCodeArray = require('emojis-unicode');
    const convertedCodeDigits = toArrayBase(aNumber, emojiCodeArray);
    
    return convertedCodeDigits;
};

exports.toAlphaBase = function (aNumber) {
    const alphaArray = "abcdefghijklmnopqrstuvwxyz".split("");
    if(alphaArray.length !== 26)
        throw new Error("Alphabet is missing letters");

    const convertedCodeDigits = toArrayBase(aNumber, alphaArray);
    
    return convertedCodeDigits;
};

exports.toAlphaNumBase = function (aNumber) {
    const convertedCodeDigits = aNumber.toString(36).split("");
    
    return convertedCodeDigits;
};
