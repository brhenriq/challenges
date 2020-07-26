const express = require('express');
const teachers = require('./teachers');
const routes = express.Router();

routes.get("/", function(request, response){
  return response.redirect("/teachers");
});

routes.get("/teachers", function(request, response){
  return response.render("teachers/index");
});

routes.get("/teachers/create", function(request, response){
  return response.render("teachers/create");
});

routes.get('/teachers/:id', teachers.show);

routes.get('/teachers/:id/edit', teachers.edit);

routes.post("/teachers", teachers.post);

routes.get("/students", function(request, response){
  return response.render("students/index");
});

module.exports = routes;