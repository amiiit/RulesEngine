import Logger from 're/logger'
import Rule from 're/rule'
import Validator from 're/validator'
import fs from 'fs'

(()=> {
    const argv = process.argv;

    const flagValue = (flag) => {
        const flagIndex = argv.indexOf(flag)
        return flagIndex == -1 ? undefined : argv[flagIndex + 1]
    }

    const rulesFile = flagValue('-r')
    const valuesFile = flagValue('-v')
    const logger = new Logger()

    if (!rulesFile || !valuesFile) {
        logger.info("Usage: node rulesengine-cli -r <rules_json_file> -v <values_json_file>")
        return
    }

    const values = JSON.parse(fs.readFileSync(valuesFile)).values
    const rules = JSON.parse(fs.readFileSync(rulesFile)).rules

    new Validator(rules).apply(values)

})()


