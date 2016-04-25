AIRPORT API PROJECT
============================

Node.js basic project which contains sequelizejs integration along with basic mocha test suits to test RESTFULL API as well as modules of application.


DIRECTORY STRUCTURE
-------------------

      bin/                contains bash scripts
      config/             contains application configurations
      controllers/        contains Web controllers
      docs/               contains api documentation
      models/             contains sequelizejs model
      public/             contains some basic public assets
      routes/             contains some basic application routes
      services/           contains some basic application services
      tests/              contains various tests for the basic application
      views/              contains view files for the Web application


REQUIREMENTS
------------

The minimum requirement by this project template that your Web server supports Node.js v 0.12.12


INSTALLATION
------------

### Install through Vagrant

Follow this link: https://gist.github.com/smali-kazmi/e3e75324dc1b3f80f32a

Please both files into a folder and run following commands

```
vagrant up
vagrant ssh
```

after `ssh` 

```
cd /vagrant/airport-api-dm
npm run start //start node instance
```
~~~
http://localhost:3000/api/all/stats
~~~


CONFIGURATION
-------------

### Database

Edit the file `config/config.js` with real data, for example:

```javascript
module.exports = {
  "test": {
    "username": "smak",
    "password": "smak",
    "database": "aiport_api_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": console.log,
  },
  "development": {
    "username": "smak",
    "password": "smak",
    "database": "aiport_api_development",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "logging": console.log,
  }
}
```

### DB Dump

No need of it; sequelizejs create tables automatically. 

### Test Data
In the project folder please run

```
npm run parse-csv
```

Routes
-------------

 1. GET /api/all/stats
 2. GET /api/:airport_id/stats
 3. GET /api/:airport_id/reviews
 4. GET /api/:airport_id/reviews?overall_rating=[Number]
