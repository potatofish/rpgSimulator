class Game {
    constructor(config) {
        console.log(["Class", , config]);
        this.#system = new System();
    }


    start() {
        return this.#system.spawnSession()
    }
}

module.exports = Game;