export default class Rule {

    constructor(ruleObject) {
        this.id = ruleObject.id
        this.function = eval("("+ruleObject.function + ")")
        this.trueId = ruleObject.true_id
        this.falseId = ruleObject.false_id
    }

}