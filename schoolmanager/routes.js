const express = require('express');
const routes = express.Router();

routes.get("/", function(request, response){
  return response.redirect("teachers");
});

routes.get("/teachers", function(request, response){
  return response.render("teachers/index");
});

routes.get("/students", function(request, response){
  return response.render("students/index");
});

module.exports = routes;