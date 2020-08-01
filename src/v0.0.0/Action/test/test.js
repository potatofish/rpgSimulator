const assert = require('assert');
const ActionManager = require('../ActionManager');

describe('ActionManager', function () {
    describe('Constructor', function () {
        it('Test stuff', function () {
            let actionManager = new ActionManager();

            let foo = "Foo"

            actionManager.manage(foo);

            let fooKey = actionManager.keysOf(foo)[0];

            fooKeyValue = actionManager.atKey(fooKey)

            assert.equal(fooKeyValue, foo);
        });

        it('Test Other stuff', function () {
            let actionManager = new ActionManager();

            let foo = "Foo2"

            actionManager.manage(foo);

            let fooKey = actionManager.keysOf(foo)[0];

            fooKeyValue = actionManager.atKey(fooKey)

            assert.equal(fooKeyValue, foo);
        });
    });
});

