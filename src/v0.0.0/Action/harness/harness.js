//*jshint node: true, esversion: 9*/
"use strict";

const ActionFactory = require("../ActionFactory")
const Action = require("../Action")


let actionFactory = new ActionFactory();

console.log({actionFactory, typeof: typeof actionFactory, isActionFactory: actionFactory instanceof ActionFactory});

//console.log("%s", ActionFactory);


let action = actionFactory.create();

console.log({action, typeof: typeof action, isAction: action instanceof Action});
