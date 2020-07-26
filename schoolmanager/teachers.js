const fs = require('fs');
const data = require('./data.json');
const { age, date } = require('./utils');

exports.post = function(request, response){
  const keys = Object.keys(request.body);

  for (const key of keys) {
    if(request.body[key] == "")
      return response.send('Please, fill all fields!');
  }

  let {avatar_url, birth, name, schooling, type_class, atuation} = request.body;

  birth = Date.parse(request.body.birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    schooling, 
    type_class, 
    atuation,
    created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return response.send("Write file error");

    return response.redirect("/teachers");
  })

}

exports.show = function(request, response){
  const { id } = request.params;

  const foundteacher = data .teachers.find(function(teacher){
    return teacher.id == id;
  })

  if(!foundteacher) return response.send("teacher Not Found!");

  const teacher = {
    ...foundteacher,
    age: age(foundteacher.birth),
    atuation: foundteacher.atuation.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundteacher.created_at),
  }

  return response.render("teachers/show", { teacher });
}

exports.edit = function(request, response){
  const { id } = request.params;

  const foundteacher = data .teachers.find(function(teacher){
    return teacher.id == id;
  })

  if(!foundteacher) return response.send("teacher Not Found!");

  const teacher = {
    ...foundteacher,
    birth: date(foundteacher.birth)
  }

  return response.render("teachers/edit", { teacher });
}