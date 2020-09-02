//*jshint node: true, esversion: 9*/
"use strict";

const ActionFactory = require("../ActionFactory")
const Action = require("../Action")


let actionFactory = new ActionFactory();

//console.log({actionFactory, typeof: typeof actionFactory, isActionFactory: actionFactory instanceof ActionFactory});

//console.log("%s", ActionFactory);


let action = actionFactory.create();

//console.log({action, typeof: typeof action, isAction: action instanceof Action});


const ActionManager = require('../ActionManager');


let actionManager = new ActionManager();

//console.log("%s", actionManager.seed);


let foo = "Foo"
for (let index = 0; index < 100; index++) {
    //actionManager.manage(foo);
    
}
actionManager.manage(foo);
//console.log({om: objectManager});
//actionManager.manage(foo);
actionManager.manage("Bar");

actionManager.manage("BMO");


//console.log({om: actionManager, list: actionManager.list, size: actionManager.size, keys: actionManager.keys});

//console.log({atKey: actionManager.atKey(actionManager.keys[2])});

actionManager.release(actionManager.keys[2])
//console.log({om: actionManager, list: actionManager.list, size: actionManager.size, keys: actionManager.keys});

//console.log({keysOfFoo: actionManager.keysOf(foo)});

const roll = function (volume, sides) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max)) + 1;
    }

    let results = [];
    for (let count = 0; count < volume; count++) {
        results.push(getRandomInt(sides));
    }
    return results
}

let dice = actionManager.create("roll", roll);
let result = dice.execute(3,6);
let summedResult = result.reduce((elementA, elementB) => {return elementA + elementB});
console.log({dice, roll, result, summedResult});



