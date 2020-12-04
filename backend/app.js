const SwaggerParser = require("@apidevtools/swagger-parser");

const express = require('express')
const cors = require('cors')
const fs = require('fs');

const app = express()
const port = 3000
app.use(cors())

app.use(express.json());

app.post('/parseMe', (req, res) => {

    console.log(req.body.filecontent)
    fs.writeFile("./files/file.yaml", req.body.filecontent, function(err) {
        if(err) {
            return console.log(err);
        }
      //  console.log("The file was saved!");
        var asd = openApiSpecParser('./files/file.yaml')
    
        asd.then((a)=> {
         //   console.log(a[0].name);
            res.status(200).send(JSON.stringify(a))
        })
    }); 
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

function openApiSpecParser(apiFileName) {
  const validEndPoints = [];

  const parser = new SwaggerParser();

  return parser.dereference(apiFileName).then((api) => {
    for (const [key, value] of Object.entries(api.paths)) {
      //key: /random-string -  value: {get : {...}}
      for (const [key2, value2] of Object.entries(value)) {
        // key2: get - value2: summary -  value2: responses
        for (const [key3, value3] of Object.entries(value2['responses'])) {
          // key3: 200 (error code) - value3.description - value3.content
          // if we can reach this point, content is valid, we can save it into our array
          if (
            value3['content'] &&
            value3['content']['application/json'] &&
            key3 &&
            value3['content']['application/json'].schema
          ) {
            const endpoint = { name: key.substring(1) };
            endpoint['type'] = 'endpoint';
            endpoint['properties'] =
              value3['content']['application/json'].schema.properties;
            validEndPoints.push(endpoint);
          }
        }
      }
    }
    return validEndPoints;
  });
}
