const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'microservice_monitoring',
    multipleStatements: true
});

db.connect(err => {
    if (err) {
        throw err;
    }
    console.log("mysql Connected...")
    seedDB();
    console.log("database was seeded")
});

//create users for seeding db

class User {
    constructor(username, email, accessToken) {
        this.username = username;
        this.email = email;
        this.access_token = accessToken;
    }
}

class Endpoint {
    constructor(name,url,owner){
        this.name = name
        this.url = url
        this.owner = owner
    }
}

const AppliftingUser = new User(
    "Applifting",
    "info@applifting.cz",
    "93f39e2f-80de-4033-99ee-249d92736a25"
);

const BatmanUser = new User(
    'Batman',
    'batman@example.com',
    "dcb20f8a-5657-4f1b-9f7f-ce65739b359e"
);

const dogsEndpoint      = new Endpoint("dogsEndpoint",      "http://localhost:3000/api/v1/dogs",1)
const catsEndpoint      = new Endpoint("catsEndpoint",      "http://localhost:3000/api/v1/cats",2)
const meowfactsEndpoint = new Endpoint("meowfactsEndpoint", "http://localhost:3000/api/v1/meowfacts",1)

const users = [AppliftingUser,BatmanUser]
const endpoints = [dogsEndpoint,catsEndpoint,meowfactsEndpoint]


//seed db


seedDB = () => {
    let userKeys = Object.keys(users[0]);
    let endpointsKeys = Object.keys(endpoints[0]);
    let userValues = users.map(obj => userKeys.map(key => obj[key]));
    let endpointValues = endpoints.map(obj => endpointsKeys.map(key => obj[key]));
    const           databaseTemplateSQL = `DATABASE microservice_monitoring`
    const             deleteDatabaseSQL = `DROP ${databaseTemplateSQL}`
    const             createDatabaseSQL = `CREATE ${databaseTemplateSQL}`
    const                useDatabaseSQL = `USE microservice_monitoring`
    const              createUsersTable = `CREATE TABLE users(id int AUTO_INCREMENT,username VARCHAR(255) NOT NULL, email VARCHAR (320) NOT NULL , access_token VARCHAR(1000) NOT NULL, PRIMARY KEY(id)) ENGINE=INNODB`
    const createMonitoredEndpointsTable = `CREATE TABLE monitoredEndpoints(id int AUTO_INCREMENT, name VARCHAR(255) NOT NULL, url VARCHAR(2083) NOT NULL, date_of_creation DATETIME DEFAULT CURRENT_TIMESTAMP, date_of_last_check DATETIME, monitored_interval INT,PRIMARY KEY(id),owner int, FOREIGN KEY (owner) REFERENCES users(id) ON DELETE CASCADE) ENGINE=INNODB`
    const   createMonitoredResultsTable = `CREATE TABLE monitoredResults(id int AUTO_INCREMENT, date_of_check DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, returned_http_status_code int NOT NULL, returned_payload VARCHAR(2083) NOT NULL,PRIMARY KEY(id),monitoredEndpoint int, FOREIGN KEY (monitoredEndpoint) REFERENCES monitoredEndpoints(id) ON DELETE CASCADE) ENGINE=INNODB`
    const                   addUsersSQL = `INSERT INTO users(${userKeys.join(',')}) VALUES ?`
    const               addEndpointsSQL = `INSERT INTO monitoredendpoints (${endpointsKeys.join(',')}) VALUES ?`
    const sql = `${deleteDatabaseSQL};${createDatabaseSQL};${useDatabaseSQL};${createUsersTable};${createMonitoredEndpointsTable};${createMonitoredResultsTable};${addUsersSQL};${addEndpointsSQL}`
        db.query(sql,[userValues, endpointValues], (err, result) => {
            if(err) throw err;
        })

}





module.exports = db