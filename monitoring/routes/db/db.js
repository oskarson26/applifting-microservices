const Router = require("restify-router").Router;
const router = new Router();
const mysql = require('mysql')

const db = require('../../config.js')

router.add('/table/create',require('./tables'))

router.get('/createdb', (req, res) => {
    let sql = "CREATE DATABASE microservice_monitoring";
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('database created...')
    })
});

module.exports = router


