class ObjectFactory {
    constructor(config) { 
        console.log("ObjectFactory Made");
        this._config = config;
    }

    create() {
        return new Object()
    }
}

module.exports = ObjectFactory;
