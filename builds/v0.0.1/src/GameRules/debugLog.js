/* jshint node: true, esversion: 10*/
"use strict";

let nesting = 0;

function debugLog(message) {
    //TODO add class sorucing into this
    const tabsForNesting = "\t".repeat(nesting);
    const debugPrefix = "##>";
    console.debug(`${tabsForNesting}${debugPrefix} ${message}`);
    return;
}

function increaseNest(anInterval) {
    let interval = ((value, defaultIfUndefined)=>{
        if(value === undefined)
            return defaultIfUndefined;
        return value;
    })(anInterval, 1);
    nesting += parseInt(interval);
}

function decreaseNest(anInterval) {
    let interval = ((value, defaultIfUndefined)=>{
        if(value === undefined)
            return defaultIfUndefined;
        return value;
    })(anInterval, 1);
    nesting -= parseInt(interval);
}

exports.debugLog = debugLog;
exports.increaseNest = increaseNest;
exports.decreaseNest = decreaseNest;
