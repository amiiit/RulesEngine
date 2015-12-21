export default class RulesEngine {

    constructor(rules) {
        this.rules = []
        rules.forEach((rule) => {
            this.rules[rule.id] = parseRule(rule)
        })
    }

}