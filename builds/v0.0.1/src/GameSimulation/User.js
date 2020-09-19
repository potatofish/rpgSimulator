/* jshint node: true, esversion: 10*/
"use strict";

const seeder = Date.now;

class User {
    constructor(aName) {
        this._name = aName;
        let seed = seeder();
        this._id = "USER-"+parseInt(seed).toString(32);
    }

    get name() {
        return this._name;
    }

    get uniqueID() {
        return this._id;
    }
}

module.exports = User;
