const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 3000;

app.use(cors()) //cors middleware

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Openapi Explorer APP!')
});

app.use('/', express.static(__dirname + '/static'));

app.use('/api', require('./api')); //interpreting with api folder

app.listen(port, () => {
  console.log(`Openapi Explorer APP is listening at http://localhost:${port}`)
});