//npm requires
const restify = require('restify');


//module requires


const db = require('./config.js')
const endpointMonitoring = require('./routes/monitoring/cron/cron.js')

// server setup

const server = restify.createServer();
server.use(restify.plugins.queryParser())

//routes 
    //require
        const dbRoutes = require('./routes/db/db.js')
        const monitoringRoutesV1 = require('./routes/monitoring/v1.js')
    //apply
dbRoutes.applyRoutes(server, '/db')
monitoringRoutesV1.applyRoutes(server, '/api/v1')

//start endpoint monitoring

endpointMonitoring.start()

// start server
server.listen(3001, () => {
    console.log("monitoring microservice is listening at port 3001")
})