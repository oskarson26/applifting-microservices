const CronJob = require('cron').CronJob
const db = require('../../../config.js')
const fetch = require('node-fetch');

const endpointMonitoring = new CronJob('20 * * * * *', function () {
    console.log(`starting endpoint monitoring, the time is ${new Date()}`);
    // retrieve endpoints from DB
        let sql = `SELECT * from monitoredendpoints`
        db.query(sql, (err, result) => {
            result.forEach(endpoint => {
                // fetch the endpoint URL
                fetch(endpoint.url)
                .then(parseJSON)
                .then(response => {
                    // create monitored result
                    let sql = `INSERT INTO monitoredresults SET ?`
                    const data = {
                        returned_http_status_code: response.status,
                        returned_payload: response.message,
                        MonitoredEndpoint: endpoint.id
                    }
                    db.query(sql, data, err => {
                        if(err) throw err;
                        if(endpoint.date_of_last_check !== null){
                            const startDate = endpoint.date_of_last_check.getTime()
                            var monitoredInterval = (new Date().getTime() - startDate) / 1000
                        }
                        else var monitoredInterval = 0
                        let sql = `UPDATE monitoredendpoints SET date_of_last_check = current_timestamp(), monitored_interval = ${monitoredInterval} WHERE id = ${endpoint.id}`
                        db.query(sql, err => {
                            if(err) throw err;
                        })
                        console.log(`${endpoint.name} was succesfully checked. Result of this monitoring was saved to the database`)
                        console.log('***************************************************')
                    })
                })
                .catch(e => console.log(e))
            })
        })
    
    
});


parseJSON = (response) => response.json()

module.exports = endpointMonitoring