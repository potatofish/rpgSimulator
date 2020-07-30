class ObjectManager {
    constructor(adder, remover) {   
        this._managedObjects = {};
    }


    add(object) {
        let counter = 0
        let timestampMS = Date.now();
        let propertyKey = timestampMS + "-" + counter;
        while(this._managedObjects[propertyKey] !== undefined) {
            propertyKey = timestampMS+ "-" + counter++;
            console.log({propertyKey});
        }
        
        this._managedObjects[propertyKey] = object;
        let result = {};
        result[propertyKey] = object;
        return result;
    }

    remove(key) {
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
}

module.exports = ObjectManager;
