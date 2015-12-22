import Rule from 're/rule'
import Validator from 're/validator'
import {expect} from 'chai'
import Logger from 're/logger'
import {values} from 'assets/fnv-values.json'
import {rules} from 'assets/fruit-n-veg-rules.json'
import {spy} from 'sinon'

describe('test rules', function () {

    let loggerMock
    let validator
    let dummyObjects

    beforeEach(function () {
        loggerMock = new Logger({silent: true})
        loggerMock.info = spy()
        loggerMock.success = spy()
        loggerMock.failure = spy()

        validator = new Validator(rules, loggerMock)
    })

    it('parse rule', function () {

        let rule = new Rule({
                "id": "is processed",
                "function": "function(obj){ return obj.family == 'processed'}",
                "true_id": "is processed healthy",
                "false_id": null
            }
        )

        let dummyObjects = {
            processed: {family: 'processed', name: 'dummy object 1'},
            illegalFamily: {family: 'xxxxxxxxx', name: 'dummy object 2'}
        }

        expect(rule.function(dummyObjects.processed)).to.be.true
        expect(rule.function(dummyObjects.illegalFamily)).not.to.be.true
    })

    it('parse rules', function () {
        expect(Object.keys(validator.rules).length).to.equal(4)
    })

    it('apply to single object', function () {
        validator.apply(values[0])
    })

    it('apply to multiple objects', function () {
        validator.apply(values)

    })

    it('apply to cucumber', function () {
        validator.apply(values.find((val)=> val.name == 'cucumber'))
        expect(loggerMock.success.callCount).to.equal(3)
        expect(loggerMock.failure.callCount).to.equal(0)
        expect(loggerMock.success.lastCall.calledWithExactly('cucumber matched all rules successfully')).to.be.true
    })

    it('apply to miso paste', function () {
        validator.apply(values.find((val)=> val.name == 'miso paste'))
        expect(loggerMock.success.callCount).to.equal(1)
        expect(loggerMock.failure.callCount).to.equal(3)
        expect(loggerMock.failure.lastCall.calledWithExactly('miso paste failed to match the rules')).to.be.true
    })
})