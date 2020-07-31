//*jshint node: true, esversion: 9*/
"use strict";

const ObjectFactory = require('../ObjectFactory');

class ActionFactory extends ObjectFactory {
    constructor(config) {
        console.log("ActionFactory Made");
        super(config);
    }
}

//console.log("%s", ActionFactory);
module.exports = ActionFactory;
