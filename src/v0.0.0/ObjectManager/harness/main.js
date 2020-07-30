//*jshint node: true, esversion: 9*/
"use strict";

const ObjectManager = require('../../ObjectManager');


let objectManager = new ObjectManager();


let foo = "Foo"
objectManager.add(foo);
//console.log({om: objectManager});
objectManager.add(foo);
objectManager.add("Bar");
objectManager

console.log({om: objectManager, list: objectManager.list, size: objectManager.size, keys: objectManager.keys});

console.log({atKey: objectManager.atKey(objectManager.keys[2])});

objectManager.remove(objectManager.keys[2])
console.log({om: objectManager, list: objectManager.list, size: objectManager.size, keys: objectManager.keys});

console.log({keysOf: objectManager.keysOf(foo)});



