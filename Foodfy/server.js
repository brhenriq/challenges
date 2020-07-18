const express = require('express');
const nunjucks = require('nunjucks');

const data = require("./data");
const server = express();

server.use(express.static('public'));
server.use(express.static('assets'));
server.set("view engine", "njk");

nunjucks.configure("views", {
  express:server,
  noCache: true
});

server.get("/", function(request, response){
  return response.render("index", { items: data });
}); 

server.get("/about", function(request, response){
  return response.render("about");
});

server.get("/recipes", function(request, response){
  return response.render("recipes", { items: data });
});

server.get("/recipes/:id", function (request, response) {
  const recipeId = request.params.id;

  const recipe = data.find(function(recipe){
    return recipe.id == recipeId;
  });

  if (!recipe) {
    return response.send("Recipe not found");
  }

  return response.render("details", { recipe });
});

server.listen(3000, function() { });