'use strict';

const db = require('../_db.js');
const Sequelize = require('sequelize');

module.exports = db.define('campus', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    mascot: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: 10,
        }
    }
    }, {
     scopes: {
    studentIds: () => ({ // function form lets us use to-be-defined models
      include: [{
        model: db.model('students'),
        attributes: ['id']
      }]
    }),
    populated: () => ({ // function form lets us use to-be-defined models
      include: [{
        model: db.model('students').scope('defaultScope', 'populated')
      }]
    })
  }
});