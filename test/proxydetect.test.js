var proxydetect = require('..')

test('No callback', () => {
    expect(() => {
        proxydetect()
    }).toThrow(TypeError)
})
test('Expected structure', done => {
    proxydetect((err, proxy) => {
        expect(err).toBeNull()

        expect(proxy).toMatchObject({
            enable: expect.any(Boolean),
            server: {
                http: expect.any(String),
                https: expect.any(String),
                ftp: expect.any(String),
                socks: expect.any(String)
            }
        })
        return done()
    })
})
