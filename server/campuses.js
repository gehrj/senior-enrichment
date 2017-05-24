const express = require('express');
const router = new express.Router();
const models = require('../db/models')
const Campus = models.Campus

module.exports = router;

router.get('/', (req,res,next) => {
    Campus.findAll()
    .then(campuses => res.send(campuses))
    .catch(next);
});

router.get('/:campusId', (req,res,next) => {
    Campus.findOne( { where: { id: req.params.campusId } })
    .then(campus => res.send(campus))
    .catch(next);
});

router.post('/', (req,res,next) => {
    Campus.create(req.body)
    .then(campus => res.status(201).send(campus))
    .catch(next);
});

router.put('/:campusId', (req,res,next) => {
    Campus.update( req.body, { where : { id: req.params.campusId } }) //finish this part...
})

router.delete('/:campusId', (req,res,next) => {
    Campus.destroy({ where: { id: req.params.id } })
    .then(deleted => res.status(204).send({}))
    .catch(next);
});