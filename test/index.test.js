var proxydetect = require('..')

test('Expected structure', function () {
    proxydetect(function (err, proxy) {
        expect(err).toBeNull()
        expect(typeof proxy).toBe('object')
        expect(proxy).toHaveProperty('enable')
        expect(proxy).toHaveProperty('server')
        expect(proxy).toHaveProperty('server.http')
        expect(proxy).toHaveProperty('server.https')
        expect(proxy).toHaveProperty('server.ftp')
        expect(proxy).toHaveProperty('server.socks')
    })
})
