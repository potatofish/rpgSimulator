//*jshint node: true, esversion: 9*/
"use strict";
/**
 * Concept
 * Any Rule or Aim of the Game. 
 * Any Tools required to play the game. 
 * Any meta-knowledge required understand ( i.e. this )
 * 
 * Any element of the game that can be acted on
 */

class Concept {
    #name
    #element
    
    constructor(name, element) {
       this.#name = `${name}`;
       this.#element = element;

    }

    get name() {
        return this.#name;
    }

    set name(aName) {
        this.#name = `${aName}`;
    }

    get element() {
        return this.#element;
    }
}

module.exports = Concept;
