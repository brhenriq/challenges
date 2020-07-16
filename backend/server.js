const express = require('express');
const nunjucks = require('nunjucks');

const server = express();

server.use(express.static('public'));
server.set("view engine", "njk");

nunjucks.configure("views", {
  express:server
});

server.get("/", function(request, response){
  return response.render("about");
}); 

server.get("/trainings", function(request, response){
  return response.render("trainings");
});

server.use(function(req, res) {
  res.status(404).render("not-found");
});

server.listen(5000, function() { });
 