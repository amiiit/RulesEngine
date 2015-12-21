import Rule from '../rule'
import Rules from '../rules'
import {expect} from 'chai'

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

    it('parse rule', function () {
        let rule = new Rule(rawRule)
        expect(rule.function({family: 'processed'})).to.be.true
        expect(rule.function({family: 'xxxxxxxxx'})).not.to.be.true
    })

    it('parse rules', function(){
        let rules = new Rules(rawSetOfRules)
        expect(Object.keys(rules.rules).length).to.equal(4)
    })

})