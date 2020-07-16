const express = require('express');
const nunjucks = require('nunjucks');

const data_trainings = require("./data");
const server = express();

server.use(express.static('public'));
server.set("view engine", "njk");

nunjucks.configure("views", {
  express:server,
  noCache: true
});

server.get("/", function(request, response){
  const data_about = {
    avatar_url: "https://avatars0.githubusercontent.com/u/28929274?s=200&v=4",
    name: "Rocketseat",
    role: "Plataforma de educação em tecnologia 🚀",
    description: "As melhores tecnologias em programação, direto ao ponto e do jeito certo.",
    tecs: [
      { name: "Node.js" },
      { name: "React" },
      { name: "React Native" }
    ],
    links: [
      { name: "Comunidade", url:"https://discordapp.com/invite/gCRAFhc" },
      { name: "Email", url:"mailto:oi@rocketseat.com.br" },
      { name: "Telefone", url:"tel:+5547992078767" }
    ]
  };
  return response.render("about", { data_about });
}); 

server.get("/trainings", function(request, response){
  return response.render("trainings", { items: data_trainings });
});

server.get("/course", function(request, response){
  const id = request.query.id;
  const training = data_trainings.find(function(training){
      return training.id == id;
  });

  if(!training){
    return response.send("Training not found")
  }



  return response.render("course", { training });
});

server.use(function(req, res) {
  res.status(404).render("not-found");
});

server.listen(5000, function() { });
 