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
            label: aLabel
        };
    }

    get canTarget() {
        return this.options.targetable === true;
    }

    get canEdit() {
        return this.options.editable === true;
    }

    get label() {
        return this.description.label;
    }
}

module.exports = GameConcept;
