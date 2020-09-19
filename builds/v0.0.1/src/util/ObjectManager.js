/* jshint node: true, esversion: 10*/
"use strict";

const ObjectFactory = require('./ObjectFactory');
var isEqual = require('lodash.isequal');


class ObjectManager {
    constructor() {   
        this._managedObjects = {};
        this._keySeedingFunction = Date.now;
        this._objectFactory = new ObjectFactory();
    }

    create() {
        //console.log("OM create from factory: %s", this._objectFactory);
        let newObject = this._objectFactory.create.apply(null, arguments);
        return newObject;
    }

    manage(object) {
        let counter = 0;
        let seededKey = this.seed();
        let propertyKey = seededKey + "-" + counter;
        while(this._managedObjects[propertyKey] !== undefined) {
            propertyKey = seededKey + "-" + counter++;
            //console.log({propertyKey});
        }
        
        this._managedObjects[propertyKey] = object;
        let result = {};
        result[propertyKey] = object;
        //console.log({manageResult: result});
        
        return result;
    }

    release(key) {
        let deletedObject = this._managedObjects[key];
        delete this._managedObjects[key];
        return deletedObject;
    }

    atKey(key) {
        return this._managedObjects[key];
    }

    keysOf(objectToFind) {
        let keyList = [];
        this.keys.forEach((key) => {
            // console.log({
            //     key,
            //     object: this._managedObjects[key],
            //     objectToFind,
            //     truth: (this._managedObjects[key] === objectToFind)
            // });
            
            if (isEqual(this._managedObjects[key], objectToFind)) {
                keyList.push(key);
            }
        });
        return keyList;
    }

    get list() {
        let keyObjectPairs = {};
        this.keys.forEach((key) => {
            keyObjectPairs[key] = this._managedObjects[key];
        });
        return keyObjectPairs;
    }

    get size() {
        return Object.keys(this._managedObjects).length;
    }

    get keys() {
        const debugMessage = {
            "ObjectManager.keys()": Object.keys(this._managedObjects)
        };
        //console.log(debugMessage);
        return Object.keys(this._managedObjects);
    }

    set seed(seeder) {
        if (typeof seeder !== "function") {
            throw "argument is not function";
        }
        //console.log("setseeder: %s", seeder);
        this._keySeedingFunction = seeder;
    }

    seed() {
        return `${this._keySeedingFunction()}`;
    }
}

module.exports = ObjectManager;
