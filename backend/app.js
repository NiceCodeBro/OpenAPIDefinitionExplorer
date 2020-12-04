const SwaggerParser = require("@apidevtools/swagger-parser");
const { v4: uuidv4 } = require('uuid');

const express = require('express')
const cors = require('cors')
const fs = require('fs');

const app = express()
const port = process.env.PORT || 3000;

app.use(cors()) //cors middleware

app.use(express.json());
app.use('/api', require('./api'));
app.post('/parseMe', (req, res) => {

  const uniqueFilename = `${uuidv4()}.yaml`
  const filePath = `./files/${uniqueFilename}`;

  fs.writeFile(filePath, req.body.filecontent, function(err) {
    if(err) {
        return console.log(err);
    }

    const validEndPoints = openApiSpecParser(filePath)

    try {
      //try to delete the created file, since there is no need to have it more.
      fs.unlinkSync(filePath);
    }
    // If an error occurred while deleting files
    catch(err) {
      console.error(err);
    }

    return validEndPoints.then((endPoints) => {
        return res.status(200).send(JSON.stringify(endPoints))
    });
  }); 
});

app.listen(port, () => {
  console.log(`Openapi Explorer APP is listening at http://localhost:${port}`)
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
