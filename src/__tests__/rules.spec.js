import Rule from 're/rule'
import Validator from 're/validator'
import {expect} from 'chai'
import Logger from 're/logger'
import {values} from 'assets/fnv-values.json'
import {rules} from 'assets/fruit-n-veg-rules.json'

describe('test rules', function () {

    let logger
    let validator
    let dummyObjects

    beforeEach(function () {
        logger = new Logger({silent: true})
        validator = new Validator(rules, logger)


    })

    it('parse rule', function () {

        let rule = new Rule({
                "id": "is processed",
                "function": "function(obj){ return obj.family == 'processed'}",
                "true_id": "is processed healthy",
                "false_id": null
            }
        )

        console.log('RULEEEE', rule)

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
        expect(true).to.be.true
    })

    it('apply to multiple objects', function () {
        validator.apply(values)
        expect(true).to.be.true

    })
})