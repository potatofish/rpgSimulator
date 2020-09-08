/* jshint node: true, esversion: 10*/
"use strict";

const User = require("./User");

class SystemUser extends User {
    constructor(aGameSimulation) {
        super("System");
    }
}

module.exports = SystemUser;
