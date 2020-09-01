class GameRule {
    constructor(anAction, aCondition) {
       this.#action = anAction | new GameAction();
       this.#condition   = aCondition | new GameCondition()
    }

    get action() {
        return this.#action;
    }

    get condition() {
        return this.#condition;
    }
}