'use strict';
var Sequelize = require('sequelize')
var db = require('../_db');


module.exports = db.define('user', {
  name: Sequelize.STRING,
})
