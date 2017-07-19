/* jshint esversion:6 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8080;

let wordArr = [];
let score = 0;

function handlePost( req, res ) {
  let number = parseInt(req.body.points);
  req.body.points = number;
  wordArr.push(req.body);

  validation(req, res);
  console.log(wordArr);
}

function handleGet( req, res ) {
  let getBuzzArr = wordArr.map( obj => {
    return obj.buzzWord;
  });
  let buzzObj = {
    buzzWords: getBuzzArr
  };
  res.send(buzzObj);
  console.log('Printed buzzwords');
}

function handleReset( req, res ) {
  wordArr = [];
  score = 0;
  res.send({ success: true });
  console.log('Buzzwords erased, scores reset to 0');
}

function validation( req, res ) {
  if(req.res.statusCode === 200 && req.res.buzzWord !== undefined && isNan(req.res.buzzWord) === false) {
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
}

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/buzzword', handlePost);

app.post('/reset', handleReset);

app.get('/buzzwords', handleGet);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});