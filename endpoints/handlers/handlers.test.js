const handlers = require('./handlers')

test('dogsHandler should return object which contains keys "message" and "status"', () => {
    const expected = {
        message: "random message",
        status: 200
    }
    const data = JSON.stringify(expected)
    const response = handlers.dogs(expected)
    response
    .then(res => expected(res).toMatchObject(expected))
})

test('catsHandler should return object which contains keys "message" and "status"', () => {
    const expected = {
        message: "random message",
        status: 200
    }
    const data = JSON.stringify(expected)
    const response = handlers.cats(expected)
    response
        .then(res => expected(res).toMatchObject(expected))
})

test('meowfactsHandler should return object which contains keys "message" and "status"', () => {
    const expected = {
        message: "random message",
        status: 200
    }
    const data = JSON.stringify(expected)
    const response = handlers.meowfacts(expected)
    response
        .then(res => expected(res).toMatchObject(expected))
})