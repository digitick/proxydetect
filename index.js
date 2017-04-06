var Winreg = require('winreg')

function parseProxyString (proxystring) {
    var proxies = proxystring.split(';')

    if (proxies.length === 1) {
        return {
            http: proxystring,
            https: proxystring,
            ftp: proxystring,
            socks: proxystring
        }
    }

    return proxies.map(function (i) {
        return i.split('=')
    }).reduce(function (obj, i) {
        var [type, host] = i
        obj[type] = host
        return obj
    }, {})
}

module.exports = function (callback) {
    if (typeof callback !== 'function') {
        throw new TypeError('Expecting callback')
    }
    var regkey = new Winreg({
        hive: Winreg.HKCU,
        key: '\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings\\'
    })

    regkey.values(function (err, items) {
        var proxy = {
            enable: false,
            server: null
        }
        if (err) {
            return callback(err, proxy)
        }

        items.forEach(function (item) {
            if (item.name === 'ProxyEnable' && item.value === '0x1') {
                proxy.enable = true
            }

            if (item.name === 'ProxyServer') {
                proxy.server = parseProxyString(item.value)
            }
        })

        return callback(null, proxy)
    })
}
