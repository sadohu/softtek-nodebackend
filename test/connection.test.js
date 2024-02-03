const connectionTest = require('./connection/connectionTest');

test('connectionTest connects and disconnects from MySQL Server', () => {
    return connectionTest().then(() => {
        expect(true).toBe(true);
    });
});