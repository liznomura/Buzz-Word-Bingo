/* jshint esversion:6 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8080;

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/buzzwords', (req, res) => {
});

//testing bodyParser
app.post('/', (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});