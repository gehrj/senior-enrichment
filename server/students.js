const express = require('express');
const router = new express.Router();
const models = require('../db/models')
const Student = models.Student

module.exports = router;

router.get('/', (req,res,next) => {
    Student.findAll()
    .then(students => res.send(students))
    .catch(next);
});

router.get('/:studentsId', (req,res,next) => {
    Student.findOne( { where: { id: req.params.campusId } })
    .then(student => res.send(student))
    .catch(next);
});

router.post('/', (req,res,next) => {
    Student.create(req.body)
    .then(student => res.status(201).send(student))
    .catch(next);
});

router.put('/:studentId', (req,res,next) => {
    Student.update( req.body, { where : { id: req.params.studentId } }) // finish this part
})

router.delete('/:studentId', (req,res,next) => {
    Student.destroy({ where: { id: req.params.id } })
    .then(deleted => res.status(204).send({}))
    .catch(next);
});