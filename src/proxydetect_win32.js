const Winreg = require('winreg')
const Parser = require('./parser.js')

module.exports = callback => {
    var regkey = new Winreg({
        hive: Winreg.HKCU,
        key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\'
    })

    regkey.values((err, items) => {
        var proxy = {
            enable: false,
            server: Parser.DEFAULT
        }
        if (err) {
            return callback(err, proxy)
        }

        items.forEach((item) => {
            if (item.name === 'ProxyEnable' && item.value === '0x1') {
                proxy.enable = true
            }

            if (item.name === 'ProxyServer') {
                proxy.server = Parser.parse(item.value)
            }
        })

        return callback(null, proxy)
    })
}
