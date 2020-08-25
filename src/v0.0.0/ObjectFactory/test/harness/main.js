//*jshint node: true, esversion: 9*/
"use strict";

const ObjectFactory = require('../../../ObjectFactory');


let objectFactory = new ObjectFactory();

let object = objectFactory.create();

console.log({object, typeof: typeof object});
