/* jshint esversion:6 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8080;

let wordArr = [];
let score = 0;

let getBuzzArr;

function handlePost( req, res ) {
  let number = parseInt(req.body.points);
  req.body.points = number;
  wordArr.push(req.body);

  validation(req, res);
  console.log(wordArr);
}

function handleGet( req, res ) {
  getBuzzArr = wordArr.map( obj => {
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

function handlePut( req, res ) {
  const index = getBuzzArr.indexOf(req.body.buzzWord);
  if(index >= 0) {
    wordArr[index].heard = 'true';
    score += wordArr[index].points;
    res.send({
      success: true,
      newScore: score
    });
  } else {
    res.send({ success: false });
  }
}

function handleDelete( req, res ) {
  const index = getBuzzArr.indexOf(req.body.buzzWord);
  if(index >= 0) {
    wordArr.splice(index, 1);
    console.log(wordArr);
    res.send({ success: true });
  } else {
    res.send({ success: false });
  }
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

app.get('/buzzwords', handleGet);

app.post('/buzzword', handlePost);

app.put('/buzzword', handlePut);

app.delete('/buzzword', handleDelete);

app.post('/reset', handleReset);


app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});