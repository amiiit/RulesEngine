import Rule from './rule'
import Logger from 're/logger'

export default class Validator {

    constructor(rulesArray, logger = new Logger()) {
        this.rules = {}
        this.logger = logger
        rulesArray.forEach((rawRule) => {
            let rule = new Rule(rawRule)
            this.rules[rule.id] = rule
        })
        this.firstRule = this.rules[rulesArray[0].id]
        this.testForCircularity([], this.firstRule)
    }

    testForCircularity(traversedNodes = [], currentNode) {

        let alreadyVisited = traversedNodes.find((node)=> {
                return currentNode.id == node.id
            }) != undefined

        if (alreadyVisited) {
            let nodeIds = traversedNodes.map((node)=> {
                return node.id
            })
            let message = `Rules contain following cycle: [${nodeIds}] => ${currentNode.id}`
            this.logger.failure(message)
            throw message
        }

        let nodesList = [...traversedNodes, currentNode]

        if (currentNode.trueId) {
            this.testForCircularity(nodesList, this.rules[currentNode.trueId])
        }

        if (currentNode.falseId) {
            this.testForCircularity(nodesList, this.rules[currentNode.falseId])
        }

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