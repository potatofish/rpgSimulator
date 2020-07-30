require('Action');
require('Concept');
require('User');
require('Session');


class System {
    constructor(config) {
        console.log("Class System", config);
        this.#actions = [];
        this.#concepts = [];
        this.#users = [];
    }

    get actions() {
        return this.#actions
    }

    get concepts() {
        return this.#concepts
    }

    get users() {
        return this.#users
    }

    spawnSession() {
        return new Session(this.#actions, this.#concepts);
    }

    add(value) {
        switch (true) {
            case (value instanceof Action):
                this.#actions.push(value)
                return;
            case (value instanceof Concept):
                this.#concepts.push(value)
                return;
            case (value instanceof User):
                this.#users.push(value)
                return;
            default:
                throw `Unknown type: ${value}`
        }
    }
    
    remove(value) {

    }
}

module.exports = System;
