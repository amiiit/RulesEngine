const Colors = {
    green: "32"
}

const colorLog = (colorCode, msg) => {
    console.log(`\x1b[${colorCode}m`, msg, `\x1b[0m`)
}

export default class Logger {

    static info(msg) {
        colorLog(Colors.green, msg)
    }

}