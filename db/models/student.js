'use strict';

const db = require('../_db.js');
const Sequelize = require('sequelize');

module.exports = db.define('student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }      // will have to create hook to set email to name at campus.org
    }
})