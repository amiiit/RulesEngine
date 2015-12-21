import {Rule} from '../rules'
import {expect} from 'chai'

let rawRule = {
    "id": "is processed",
    "function": "function(obj){ return obj.family == 'processed'}",
    "true_id": "is processed healthy",
    "false_id": null
}

describe('test rules', function () {

    it('parse rule', function () {
        let rule = new Rule(rawRule)
        expect(rule.func({family: 'processed'})).to.be.true
        expect(rule.func({family: 'xxxxxxxxx'})).not.to.be.true
    })

})