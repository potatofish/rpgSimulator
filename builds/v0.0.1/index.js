/*jshint node: true, esversion: 9*/
"use strict";

class concept { }

function state(aClass) {
    return class State extends aClass {
        stateX() { }
    }
}


class Space extends concept {
    spaceX() { }
}


class extends state(space(concept)) { 
      constructor() {
        super();
      }
  }

let aSession = new session();

//return;

console.log({
    aSession: aSession,
    exe: state(concept).prototype,
    state: aSession instanceof state(concept),
    concept: aSession instanceof concept,
    space: aSession instanceof space(concept),
    session: aSession instanceof session
});