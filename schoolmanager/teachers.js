const fs = require('fs');
const data = require('./data.json');

exports.post = function(request, response){
  const keys = Object.keys(request.body);

  for (const key of keys) {
    if(request.body[key] == "")
      return response.send('Please, fill all fields!');
  }

  let {avatar_url, birth, name, schooling, type_class, atuation} = request.body;

  request.body.birth = Date.parse(request.body.birth);
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