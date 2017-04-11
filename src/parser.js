const DEFAULT = {
    http: '',
    https: '',
    ftp: '',
    socks: ''
}
module.exports.DEFAULT = DEFAULT
module.exports.parse = proxystring => {
    if (typeof proxystring !== 'string') {
        throw new TypeError('Expecting string')
    }
    var proxies = proxystring.split(';')

    if (proxies.length === 1) {
        return {
            http: proxystring,
            https: proxystring,
            ftp: proxystring,
            socks: proxystring
        }
    }

    return proxies.map(i => {
        return i.split('=')
    }).reduce((obj, i) => {
        var [type, host] = i
        obj[type] = host
        return obj
    }, Object.assign({}, DEFAULT))
}
