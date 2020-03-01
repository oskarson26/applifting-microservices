const Router = require("restify-router").Router;
const router = new Router();

const db = require('../../../config.js');


router.post("/add", (req, res) => {
    const accessToken = req.query.accessToken
    let sql = `SELECT * FROM users WHERE access_token = '${accessToken}'`
    db.query(sql, (err, user) => {
        const monitoredEndpoint = {
            name: req.query.name,
            url: req.query.url,
            owner: user[0].id
        }
        let sql = `INSERT INTO monitoredEndpoints SET ?`
        db.query(sql, monitoredEndpoint, (err, result) => {
            if (err) throw err;
            res.send("inserted monitoredEndpoint into the database")
        })
    })    
});

router.get("/show", (req, res) => {
    const accessToken = req.query.accessToken
    let sql = `SELECT * FROM users WHERE access_token = '${accessToken}'`
    db.query(sql, (err,user) => {
        if(err) throw err;
        const userID = user[0].id
        let sql = `SELECT * FROM monitoredendpoints WHERE owner = ${userID}`
        db.query(sql, (err, results) => {
            if(err) throw err;
            res.send(results)
        })
    })
});

router.post("/delete", (req, res) => {
    let sql = `SELECT * FROM users WHERE access_token = '${req.query.accessToken}'`
    db.query(sql, (err, user) => {
        let sql = `DELETE FROM monitoredendpoints WHERE owner = ${user[0].id}`
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.send({
                deletedEndpoint: result,
                message: "Endpoints were succesfully deleted"
            })
        })
    })
});

router.post('/update', (req, res) => {
    const updateData = {...req.query}
    delete updateData.id 
    console.log(updateData, req.query)
    let sql = `UPDATE monitoredendpoints SET ? WHERE id = ?`
    const param = [updateData, req.query.id]
    db.query(sql,param,(err, fields, rows) => {
        if(err) throw err;
        res.send(fields, rows)
    })
});



module.exports = router