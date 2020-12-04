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
    var swagger = require('./services/parserservice/swagger');
    const validEndPoints = swagger.openApiSpecParser(filePath)

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
});