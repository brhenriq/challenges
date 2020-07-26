const fs = require('fs');
const data = require('./data.json');
const { age, date } = require('./utils')


exports.show = function(request, response){
  const { id } = request.params;

  const foundInstructor = data .instructors.find(function(instructor){
    return instructor.id == id;
  })

  if(!foundInstructor) return response.send("Instructor Not Found!");

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
  }

  return response.render("instructors/show", { instructor });
}

exports.post = function(request, response){
  const keys = Object.keys(request.body);

  for (const key of keys) {
    if(request.body[key] == "")
      return response.send('Please, fill all fields!');
  }

  const {avatar_url, birth, name, gender, services} = request.body;

  request.body.birth = Date.parse(request.body.birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
    if(err) return response.send("Write file error");

    return response.redirect("/instructors")
  })

}

exports.edit = function(request, response){
  const { id } = request.params;

  const foundInstructor = data .instructors.find(function(instructor){
    return instructor.id == id;
  })

  if(!foundInstructor) return response.send("Instructor Not Found!");

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth)
  }

  return response.render("instructors/edit", { instructor });
}