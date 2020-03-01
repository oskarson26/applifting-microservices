const Router = require("restify-router").Router;
const router = new Router();

const db = require('../../config.js')

router.get("/monitoredEndpoints", (req, res) => {
    let sql =
        "CREATE TABLE monitoredEndpoints(id int AUTO_INCREMENT, name VARCHAR(255) NOT NULL, url VARCHAR(2083) NOT NULL, date_of_creation DATETIME DEFAULT CURRENT_TIMESTAMP, date_of_last_check DATETIME, monitored_interval INT,PRIMARY KEY(id),owner int, FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE) ENGINE=INNODB;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Monitored endpoints table created...");
    });
});

router.get("/monitoredResults", (req, res) => {
    let sql =
        "CREATE TABLE monitoredResults(id int AUTO_INCREMENT, date_of_check DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, returned_http_status_code int NOT NULL, returned_payload VARCHAR(2083) NOT NULL,PRIMARY KEY(id),monitoredEndpoint int, FOREIGN KEY (monitoredEndpoint) REFERENCES monitoredEndpoints(id) ON DELETE CASCADE) ENGINE=INNODB;";

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("Monitored results table created...");
    });
});

router.get("/user", (req, res) => {
    let sql =
        "CREATE TABLE users(id int AUTO_INCREMENT,username VARCHAR(255) NOT NULL, email VARCHAR (320) NOT NULL , access_token int NOT NULL, PRIMARY KEY(id)) ENGINE=INNODB;";
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send("User table was created");
    });
});

module.exports = router