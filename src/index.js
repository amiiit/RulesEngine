import Logger from './logger'

const argv = process.argv;

const flagValue = (flag) => {
    const flagIndex = argv.indexOf(flag)
    return flagIndex == -1 ? undefined : argv[flagIndex + 1]
}

const rulesFile = flagValue('-r')
const valuesFile = flagValue('-v')

if (!rulesFile || !valuesFile) {
    Logger.info("Usage: node rulesengine-cli -r <rules_json_file> -v <values_json_file>")
}
console.log(rulesFile)
console.log(valuesFile)

