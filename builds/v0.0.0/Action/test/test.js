const assert = require('assert');
const ActionManager = require('../ActionManager');
const ActionFactory = require('../ActionFactory');
const Action = require('../Action');

describe('ActionManager',  () => {
    describe('constructor()', () => {
        it('ActionManager has an ActionFactory to make Actions with', () => {
            let actionManager = new ActionManager();

            let isActionFactory = actionManager._objectFactory instanceof ActionFactory

            assert.ok(isActionFactory);
        });
    });

    describe("create()", () => {
        it("ActionManager can make Actions", ()=> {
            let actionManager = new ActionManager();
            
            let action = actionManager.create();

            let isAction = action instanceof Action;

            assert.ok(isAction);
        });

        it('ActionManager makes Action matching function provided', () => {
            let actionManager = new ActionManager();

            const woofString = "woof";
            const woof = (a,b) => {return woofString + a + b;};
            
            let action = actionManager.create(woofString, woof);

            assert.equal(woof(1,2), action.execute(1,2));
        });

        it('ActionManager makes Action matching name provided', () => {
            let actionManager = new ActionManager();

            const woofString = "woof";
            
            let action = actionManager.create(woofString, ()=>{});

            assert.equal(woofString, action.name);
        });

        it('ActionManager makes Action matching (only) name provided', () => {
            let actionManager = new ActionManager();

            const woofString = "woof";
            
            let action = actionManager.create(woofString);

            assert.equal(woofString, action.name);
        });
    });

    describe('manage()', () => {
        
    });
});

describe('ActionFactory', () => {
    
});

describe('Action', () => {
    
});
