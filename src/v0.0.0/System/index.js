require('ActionManager');
require('ConceptManager');
require('User');
require('Session');


class System {
    constructor(config) {
        console.log("Class System", config);
        this.#actionManager = new ActionManager();
        this.#conceptManager = new ConceptManager();
    }

    get actions() {
        return this.#actionManager.list();
    }

    get concepts() {
        return this.#conceptManager.list();
    }

    spawnSession() {
        return new Session(this.#actions, this.#concepts);
    }

    add(value) {
        switch (true) {
            case (ActionManager.isAction(value)):
                this.#actions.manage(value);
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
        switch (true) {
            case (value instanceof Action):
                this.#actions.splice(this.#actions.indexOf(value),1)
                return;
            case (value instanceof Concept):
                this.#concepts.splice(this.#concepts.indexOf(value),1)
                return;
            case (value instanceof User):
                this.#users.splice(this.#users.indexOf(value),1)
                return;
            default:
                throw `Unknown type: ${value}`
        }
    }
}

module.exports = System;
