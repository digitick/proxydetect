const os = require('os')

if (os.platform() !== 'win32' && os.platform() !== 'linux') {
    throw new Error('Unsupported platform')
}

module.exports = callback => {
    if (typeof callback !== 'function') {
        throw new TypeError('Expecting callback')
    }

    return (require('./proxydetect_' + os.platform() + '.js'))(callback)
}
