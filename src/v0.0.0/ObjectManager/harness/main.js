//*jshint node: true, esversion: 9*/
"use strict";

const ObjectManager = require('../../ObjectManager');


let objectManager = new ObjectManager();

objectManager.add("Foo");
//console.log({om: objectManager});
objectManager.add("Foo");
objectManager.add("Bar");

let {list, size, keys} = objectManager;
console.log({list});
console.log({size});
console.log({keys});

console.log({om: objectManager});

