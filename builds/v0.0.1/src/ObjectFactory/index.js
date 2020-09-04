/* jshint node: true, esversion: 10*/
"use strict";

class ObjectFactory {
    constructor(config) { 
        //console.log("ObjectFactory Made");
        this._config = config;
    }

    create() {
        return new Object();
    }
}

module.exports = ObjectFactory;
