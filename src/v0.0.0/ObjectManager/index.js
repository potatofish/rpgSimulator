const ObjectFactory = require('../ObjectFactory');

class ObjectManager {
    constructor() {   
        this._managedObjects = {};
        this._keySeedingFunction = Date.now;
        this._objectFactory = new ObjectFactory()
    }

    create() {
        //console.log("OM create from factory: %s", this._objectFactory);
        let newObject = this._objectFactory.create.apply(null, arguments);
        return newObject;
    }

    manage(object) {
        let counter = 0
        let seededKey = this.seed();
        let propertyKey = seededKey + "-" + counter;
        while(this._managedObjects[propertyKey] !== undefined) {
            propertyKey = seededKey + "-" + counter++;
            //console.log({propertyKey});
        }
        
        this._managedObjects[propertyKey] = object;
        let result = {};
        result[propertyKey] = object;
        return result;
    }

    release(key) {
        let deletedObject = this._managedObjects[key];
        delete this._managedObjects[key];
        return deletedObject
    }

    atKey(key) {
        return this._managedObjects[key]
    }

    keysOf(object) {
        let keyList = [];
        this.keys.forEach((key) => {
            if (this._managedObjects[key] === object) {
                keyList.push(key)
            }
        })
        return keyList
    }

    get list() {
        let keyObjectPairs = {};
        this.keys.forEach((key) => {
            keyObjectPairs[key] = this._managedObjects[key]
        })
        return keyObjectPairs;
    }

    get size() {
        return Object.keys(this._managedObjects).length;
    }

    get keys() {
        return Object.keys(this._managedObjects);
    }

    set seed(seeder) {
        if (typeof seeder !== "function") {
            throw "argument is not function"
        }s
        //console.log("setseeder: %s", seeder);
        this._keySeedingFunction = seeder
    }

    seed() {
        return `${this._keySeedingFunction()}`
    }
}

module.exports = ObjectManager;
