import Rule from './rule'
import Logger from 're/logger'

export default class Validator {

    constructor(rulesArray, logger = Logger) {
        this.rules = {}
        this.logger = logger
        rulesArray.forEach((rawRule) => {
            let rule = new Rule(rawRule)
            this.rules[rule.id] = rule
        })
        this.firstRule = this.rules[rulesArray[0].id]
    }

    applyToObject(object) {
        this.logger.info(`Applying rules to ${object.name}`)
        this.logger.increaseIdent()
        this._recursiveApply(object, this.firstRule)
        this.logger.decreaseIdent()
        this.logger.info('')


    }

    apply(o) {
        if (Array.isArray(o)) {
            o.forEach((object)=> {
                this.applyToObject(object)
            })
        } else {
            this.applyToObject(o)
        }
    }

    _recursiveApply(object, rule) {
        const logger = this.logger
        let result = rule.function(object)

        if (result) {
            logger.success(`'${rule.id}' matches`)
            if (rule.trueId) {
                result = this._recursiveApply(object, this.rules[rule.trueId])
            } else {
                logger.success(`${object.name} matched all rules successfully`)
            }
        } else {
            logger.failure(`'${rule.id}' failed to match`)
            if (rule.falseId) {
                result = this._recursiveApply(object, this.rules[rule.falseId])
            } else {
                logger.failure(`${object.name} failed to match the rules`)
            }
        }

        return result
    }

}