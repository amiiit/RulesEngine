const Colors = {
    green: 32,
    red: 31,
    blue: 34
}

export default class Logger {

    constructor(options = {}) {
        this.options = options
        this.identation = 0
    }

    increaseIdent(inc = 1) {
        this.identation += inc
    }

    decreaseIdent(dec = 1) {
        this.identation -= dec
    }

    colorLog(msg, colorCode = 0) {
        if (!this.options.silent) {
            let identationTabs = ''

            for (let i = 0; i < this.identation; i++) {
                identationTabs += '\t'
            }

            console.log(`\x1b[${colorCode}m`, identationTabs, msg, `\x1b[0m`)
        }
    }

    info(msg) {
        this.colorLog(msg, Colors.blue)
    }

    success(msg){
        this.colorLog(msg, Colors.green)
    }

    line(){
        if (!this.options.silent){
            console.log('')
        }
    }

    failure(msg){
        this.colorLog(msg, Colors.red)

    }

}