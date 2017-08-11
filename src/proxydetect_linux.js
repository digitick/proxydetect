module.exports = callback => {
    var proxy = {
        enable: false,
        server: {
            http: process.env.HTTP_PROXY || '',
            https: process.env.HTTPS_PROXY || '',
            ftp: process.env.FTP_PROXY || '',
            socks: process.env.SOCKS_PROXY || ''
        }
    }

    proxy.enable = Object.keys(proxy.server).map(k => proxy.server[k]).join('').length > 0
    return callback(null, proxy)
}
