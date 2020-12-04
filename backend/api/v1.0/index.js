var express = require('express');
var router = express.Router();
 
router.get('/', function(req, res, next) {
  res.send('Hello v1.0 GET API from TechBrij.com');
});
 
 
module.exports = router;