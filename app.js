/* jshint esversion:6 */
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.post('/:buzzWord/:points/', (req, res, next) => {
  console.log(req.params);
  res.send({ success: true });
  next();
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});