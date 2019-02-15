const Parser = require('../src/parser.js')

test('Null parameter should raise a TypeError', () => {
    expect(() => {
        Parser.parse()
    }).toThrow(TypeError)
})

test('Non string parameter should raise a TypeError', () => {
    expect(() => {
        Parser.parse(42)
    }).toThrow(TypeError)
})

test('Empty string should return a default structure', () => {
    expect(Parser.parse(''))
        .toMatchObject({
            http: '',
            https: '',
            ftp: '',
            socks: ''
        })
})
test('Single proxy', () => {
    expect(Parser.parse('127.0.0.1:80'))
        .toMatchObject({
            http: '127.0.0.1:80',
            https: '127.0.0.1:80',
            ftp: '127.0.0.1:80',
            socks: '127.0.0.1:80'
        })
})

test('Multiple proxies', () => {
    expect(Parser.parse('http=127.0.0.1:8080;https=127.0.0.1:8081'))
        .toMatchObject({
            http: '127.0.0.1:8080',
            https: '127.0.0.1:8081',
            ftp: '',
            socks: ''
        })
})
