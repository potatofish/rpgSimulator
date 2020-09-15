const assert = require('assert');
const { AssertionError } = require('assert');
const GameSimulation = require('../../../src/GameSimulation/GameSimulation.js');
const GameSystem = require('../../../src/GameRules/GameSystem.js');
const User = require('../../../src/GameSimulation/User.js');
const GameSession = require('../../../src/GameConcepts/GameSession.js');
const GamePlayer = require('../../../src/GameConcepts/GamePlayer.js');
const GameAim = require('../../../src/GameRules/GameAim.js');
const GameAction = require('../../../src/GameRules/GameAction.js');
const GameCondition = require('../../../src/GameRules/GameCondition.js');

function testChangePhaseByRule() {
    it('A joined GameSimulation Session can change phases based on rules', () => {
        const aGameSimulation = new GameSimulation();
        const earlyInitMessage = "isInitialized w/o init()";
        assert(!(aGameSimulation.isInitialized), earlyInitMessage);

        aGameSimulation.init();
        const notInitMessage = "isInitialized w/o init()";
        assert(aGameSimulation.isInitialized, notInitMessage);

        const aGameSystem = new GameSystem();

        //create a basic aim:
        //setup is complete when a player is added to the session
        const simpleSetupCondition = new GameCondition(() => {
            console.log({ simpleSetupCondition: this });
            //let condition = this.activePhase === GameSession.PHASES.SETUP;
            //condition = condition && this.players() === 1;
            let condition = true;
            return condition;
        });

        const simpleSetupAction = new GameAction(() => {
            console.log({ simpleSetupAction: this });
            //this.activePhase = GameSession.PHASES.ACTIVE;
            return true;
        });



        // //console.debug({fooTarget, label: boundGetLabel()});
        // assert.ok(dummyLabel === boundGetLabel());
        const simpleSetupRule = new GameAim(simpleSetupAction, simpleSetupCondition);
        const simpleRuleKey = aGameSystem.add(simpleSetupRule);

        //const boundSimpleSetup = aGameAction.action.bind(fooTarget);
        aGameSimulation.load(aGameSystem);
        assert.equal(aGameSimulation._gameSystem, aGameSystem);

        aGameSimulation.startSession();
        assert(aGameSimulation._activeSession instanceof GameSession);

        const aUser = new User("Barry Fu");
        try {
            const userPlayer = aGameSimulation.join(aUser);
            assert(userPlayer instanceof GamePlayer);

            aGameSimulation.play(aUser);


        } catch (error) {
            if (error instanceof AssertionError) {
                throw error;
            }
            assert.fail(`Unexpected error.\n\t ${error}`);
        }
        aGameSimulation.killSession();
    });
}
exports.testChangePhaseByRule = testChangePhaseByRule;
