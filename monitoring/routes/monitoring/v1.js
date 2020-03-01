const Router = require("restify-router").Router;
const router = new Router();

const db = require('../../config.js')

router.add('/endpoint', require('./CRUD_endpoint/crud_enpoints.js'))

router.get('/monitoringresults', (req, res) => {
    const accessToken = req.query.accessToken        
    let sql = `SELECT * FROM users WHERE access_token = '${accessToken}'`
    db.query(sql, (err, user) => {
        if(err) throw err
        let sql = `SELECT * FROM monitoredendpoints WHERE owner = ${user[0].id}`
        db.query(sql, (err, endpoints) => {
            if(err) throw err
            let endpointsIDs = []
            endpoints.forEach(endpoint => endpointsIDs.push(endpoint.id))
            let sql = `SELECT * FROM monitoredresults WHERE monitoredEndpoint in (${endpointsIDs}) ` //todo conditions
            db.query(sql,(err, monitoredResults) => {
                res.send(monitoredResults)
            })
        })
    })
})

module.exports = router