const { v4: uuidv4 } = require('uuid');

const express = require('express');
const router = express.Router();
const swagger = require('../../services/parserservice/swagger');

/**
 * This endpoint get a file content as string, create a yaml file and parse it
 * with openapi swagger parser and send results to client back.
 */
router.post('/parser/swaggerparser', (req, res) => {

  const uniqueFilename = `${uuidv4()}.yaml`; //create a unique named file
  const filePath = `./files/${uniqueFilename}`;
  const fsPromises = require('fs').promises;

  fsPromises.writeFile(filePath, req.body.filecontent).then(() => {
    const validEndPoints = swagger.openApiSpecParser(filePath);

    try { //try to delete the created file, since there is no need to have it more.
      fsPromises.unlink(filePath);
    }
    catch(err) { // If an error occurred while deleting files
      console.error(err);
    }

    return validEndPoints.then((endPoints) => {
      return res.status(200).send(JSON.stringify(endPoints))
    })
    // an error is occured during parsing.
    .catch((err)=>{
      console.error(err);
      return res.status(400).send(JSON.stringify([]));
    });
  })
  //an error is occured during writting to file
  .catch((err)=>{
    console.error(err);
    return res.status(400).send(JSON.stringify([]));
  });
});

module.exports = router;