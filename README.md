# microservice-endpoints-monitoring
An microservice used for endpoints monitoring

How to Use:

1. install all necessary scripts using "npm -i"

2. in the root folder of the project use "npm run all" to start both servers
  a) one server for CRUD endpoints management
  b) second for microservice
  
*******************************************************************************

How my microservice works?

1. When starting the microservice server, database will automaticaly get seeded.
  The database then contains
  a) Two requested users
  b) 3 monitoredEndpoints
  
  Note: The seeding and all MySQL setup is done inside config.js file
  
2. For the monitoring I've used CronJobs, which will by default get triggered every minute. You can manually change that in ./monitoring/cron/cron.js

*******************************************************************************

CRUD Endpoints:

You can manage all the endpoints at following urls:
  http://localhost/3001/api/v1/endpoint:
  
CREATE - /add => expects 3 params {name,url,accessToken}
READ - /show => expects 1 param {accessToken}
DELETE - /delete => expects 1 param {accessToken}
UPDATE - /update => expects at least 2 params {accessToken, columns you'd like to update => url,name}


If you are confused by the structure and my decisions that I made during the development of this microservice, read the file insideOskarsHead.md in this repo.

# applifting-microservices
