import {values} from 'assets/fnv-values.json'
import {rules as cyclicRules} from 'assets/rules-with-illegal-cycle.json'
import Validator from 're/validator'
import Logger from 're/logger'
import {expect} from 'chai'


describe('test for cyclic rules', function () {

    it('fail on cyclic rules', function () {
        expect(()=> {
            new Validator(cyclicRules, new Logger({silent: true}))
        }).to.throw("Rules contain following cycle: [is fresh,is processed,is processed healthy] => is processed")
    })

})