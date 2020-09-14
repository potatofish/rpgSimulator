/*jshint node: true, esversion: 9*/
"use strict";

class GameConcept {
    constructor(aLabel) {
        if (aLabel === undefined)
            throw new Error("All concepts must be labelled.");

        if (typeof aLabel !== "string")
            throw new Error("All concepts labels must be a string.");

        this.options = {
            targetable : true,
            editable: true
        };
        this.description = {
            _label: aLabel
        };
    }

    get canTarget() {
        return this.options.targetable === true;
    }

    get canEdit() {
        return this.options.editable === true;
    }

    get label() {
        return this.description._label;
    }

    set label(aString) {
        if(typeof aString !== "string") {
            throw new Error('Labels must be strings');
        }
        this.description._label = aString;
    }
}

module.exports = GameConcept;
