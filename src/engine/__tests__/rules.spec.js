import Rule from '../rule'
import Rules from '../validator'
import {expect} from 'chai'
import Logger from 're/logger'

let rawRule = {
    "id": "is processed",
    "function": "function(obj){ return obj.family == 'processed'}",
    "true_id": "is processed healthy",
    "false_id": null
}

let rawSetOfRules = [
    {id: "dummy rule 1", function: "function(){return true}"},
    {id: "dummy rule 2", function: "function(){return true}"},
    {id: "dummy rule 3", function: "function(){return true}"},
    {id: "dummy rule 4", function: "function(){return true}"}
]

describe('test rules', function () {

    let logger
    let rules
    let rule
    let dummyObjects

    beforeEach(function () {
        logger = new Logger({silent: true})
        rules = new Rules(rawSetOfRules, logger)
        rule = new Rule(rawRule)

        dummyObjects = {
            processed: {family: 'processed', name: 'dummy object 1'},
            illegalFamily: {family: 'xxxxxxxxx', name: 'dummy object 2'}
        }
    })

    it('parse rule', function () {
        expect(rule.function(dummyObjects.processed)).to.be.true
        expect(rule.function(dummyObjects.illegalFamily)).not.to.be.true
    })

    it('parse rules', function () {
        expect(Object.keys(rules.rules).length).to.equal(4)
    })

    it('apply rules', function () {
        rules.apply(dummyObjects.processed)
    })
})