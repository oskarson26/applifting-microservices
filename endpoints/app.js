const restify = require('restify');


const server = restify.createServer();

const controlers = require('./controlers/controlers')


server.get('/api/v1/dogs', controlers.dogs);

server.get('/api/v1/cats', controlers.cats);

server.get('/api/v1/meowfacts', controlers.meowfacts);

server.listen(3000, () => {
    console.log(`server is listenig at port 3000`)
});