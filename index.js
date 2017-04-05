var winreg = require('winreg')

module.exports = function(callback) {
    if(typeof callback !== 'function') {
        throw new TypeError('Expecting callback')
    }
    var regkey = new winreg({
        hive: winreg.HKCU,
        key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\'
    })

    regkey.values(function(err, items) {
        var proxy = {
            enable: false,
            server: null
        }
        if(err) {
            return callback(err, proxy)
        }

        items.forEach(function(item) {
            if('ProxyEnable' === item.name && '0x1' === item.value) {
                proxy.enable = true
            }

            if('ProxyServer' === item.name) {
                proxy.server = item.value
            }
        })

        return callback(null, proxy)
    })
}