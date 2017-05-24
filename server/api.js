'use strict'
const api = require('express').Router()
const db = require('../db')

module.exports = api

// If you aren't getting to this object, but rather the index.html (something with a joke) your path is wrong.
	// I know this because we automatically send index.html for all requests that don't make sense in our backend.
	// Ideally you would have something to handle this, so if you have time try that out!

api.get('/', (req, res) => res.send({hello: 'world'}));

api.use('/students', require('./campuses.js'));
api.use('/campuses', require('./students.js'));

api.use(function (req, res) {
  res.status(404).end();
});

