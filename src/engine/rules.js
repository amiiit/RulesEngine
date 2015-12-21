export class Rule {

    constructor(ruleObject) {
        this.id = ruleObject.id
        this.func = eval("("+ruleObject.function + ")")
        this.trueId = ruleObject.true_id
        this.falseId = ruleObject.false_id
    }

}