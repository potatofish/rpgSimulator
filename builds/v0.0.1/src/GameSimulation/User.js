/* jshint node: true, esversion: 10*/
"use strict";

class User {
    constructor(aName) {
        this._name = aName;
    }

    get name() {
        return this._name;
    }
}

module.exports = User;
