//*jshint node: true, esversion: 9*/
"use strict";

const ObjectManager = require('../../ObjectManager');


let objectManager = new ObjectManager();


let foo = "Foo"
objectManager.manage(foo);
//console.log({om: objectManager});
objectManager.manage(foo);
objectManager.manage("Bar");

objectManager.seed = function() {return "MEWO"};
objectManager.manage("BMO");


console.log({om: objectManager, list: objectManager.list, size: objectManager.size, keys: objectManager.keys});

console.log({atKey: objectManager.atKey(objectManager.keys[2])});

objectManager.release(objectManager.keys[2])
console.log({om: objectManager, list: objectManager.list, size: objectManager.size, keys: objectManager.keys});

console.log({keysOfFoo: objectManager.keysOf(foo)});



