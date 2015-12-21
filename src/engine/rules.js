import Rule from './rule'
import Logger from 're/logger'

export default class Rules {

    constructor(rulesArray) {
        this.rules = {}
        rulesArray.forEach((rawRule) => {
            let rule = new Rule(rawRule)
            this.rules[rule.id] = rule
        })
        this.firstRule = this.rules[rulesArray[0].id]
    }

    apply(object, rule = this.firstRule) {
        if (rule.function(object)){

        }
    }

}