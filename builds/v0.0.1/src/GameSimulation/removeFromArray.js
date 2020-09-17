/* jshint node: true, esversion: 10*/
"use strict";


function removeFromArray(anArray, valuesToRemove) {
    let refinedArray = [].concat(anArray);
    let listOfParse = valuesToRemove;

    if (!(Array.isArray(valuesToRemove))) {
        listOfParse = [valuesToRemove];
    }

    // console.log({listOfParse});
    listOfParse.forEach(valueToRemove => {
        const indexToRemove = anArray.indexOf(valueToRemove);
        // console.log({ setupIndex: indexToRemove });
        const frontOfArray = (() => {
            if (indexToRemove === 0)
                return [];
            return anArray.slice(0, indexToRemove - 1);
        })();

        const backOfArray = (() => {
            if (indexToRemove === (anArray.length - 1))
                return [];
            return anArray.slice(indexToRemove + 1);
        })();

        refinedArray = frontOfArray.concat(backOfArray);
    });
    return refinedArray;
}
exports.removeFromArray = removeFromArray;
