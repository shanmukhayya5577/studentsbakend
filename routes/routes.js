const express = require('express');
const routes = express.Router();
const controller = require('../controller/controller');
const registerdStudents = require('../controller/registerdStudents');


routes.post('/register',controller.register);
routes.post('/login',controller.login);
routes.put('/update/:id',controller.update);
routes.delete('/dalete/:id',controller.deleteData);
routes.get('/getData',controller.getAllData);



//add Details of students
routes.post('/studentsDetails',registerdStudents.addData);
routes.get('/getAllStudents',registerdStudents.getAllStudentsDetails);
routes.put('/updateStudents/:id',registerdStudents.editStudentsDetails)



module.exports = routes;