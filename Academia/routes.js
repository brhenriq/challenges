const express = require('express');
const instructors = require('./instructors');
const routes = express.Router();

routes.get('/', function(request, response){
  return response.redirect("/instructors");
});

routes.get('/instructors', function(request, response){
  return response.render("instructors/index");
});

routes.get('/instructors/create', function(request, response){
  return response.render("instructors/create");
});

routes.get('/instructors/:id', instructors.show);

routes.get('/instructors/:id/edit', instructors.edit);

routes.post('/instructors', instructors.post);

routes.get('/members', function(request, response){
  return response.render("members");
});

module.exports = routes;