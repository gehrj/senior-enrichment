'use strict'
const debug = require('debug')('sql');
const chalk = require('chalk');
const Sequelize = require('sequelize');
const pkg = require('../package.json');
const name = process.env.DATABASE_NAME || pkg.name;
const connectionString = process.env.DATABASE_connectionString || `postgres://localhost:5432/${pkg.name}`;
const db = require('./_db.js');
const student = require('./models/student');
const campus = require('./models/campus');
const Promise = require('bluebird');
console.log(chalk.yellow(`Opening database connection to ${connectionString}`));


// run our models file (makes all associations for our Sequelize objects)
require('./models')

// **************** seed stuff ***************************

let data = {
    student: [
        {name: 'Naruto', email: 'n@ninja.com', campus: {name: 'Leaf Village', mascot: 'Leaf' , city:'Tree' , state: 'CO' , phone:'123-456-7890'}},
        {name: 'Sauske', email: 's@ninja.com', },
        {name: 'Sakura', email: 'x@ninja.com', },
        {name: 'Haku', email: 'h@ninja.com', },
        {name: 'Gara', email: 'g@ninja.com', }
    ],
    campus: [
        {name: 'Leaf Village', mascot: 'Leaf' , city:'Tree' , state: 'CO' , phone:'123-456-7890' },
        {name: 'Hidden Mist', mascot: 'Water' , city:'Unknown' , state: 'MN' , phone:'123-456-7890' },
        {name: 'Sand Village', mascot: 'Sand' , city:'Desert' , state: 'AZ' , phone:'123-456-7890' },
        {name: 'Cloud Village', mascot: 'Cloud' , city:'Sky' , state: 'Toronto' , phone:'123-456-7890' },
    ]
}

// sync the db, creating it if necessary
function sync(force=true, retries=0, maxRetries=5) {
  return db.sync({force})
    .then(function () {
  console.log("Dropped old data, now inserting data");
  return Promise.map(Object.keys(data), function (name) {
    return Promise.map(data[name], function (item) {
      return db.model(name)
      .create(item);
    });
  });
})
  .then(ok => console.log(`Synced models to db ${connectionString}`))
  .catch(fail => {
    // Don't do this auto-create nonsense in prod, or
    // if we've retried too many times. 
    if (process.env.NODE_ENV === 'production' || retries > maxRetries) {
      console.error(chalk.red(`********** database error ***********`))
      console.error(chalk.red(`    Couldn't connect to ${connectionString}`))
      console.error()
      console.error(chalk.red(fail))
      console.error(chalk.red(`*************************************`))
      return
    }
    // Otherwise, do this autocreate nonsense
    console.log(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
    return new Promise((resolve, reject) =>
      require('child_process').exec(`createdb "${name}"`, resolve)
    ).then(() => sync(true, retries + 1))
  })
}

db.didSync = sync();
