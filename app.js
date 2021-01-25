const path = require('path');
const express = require('express');
const videos = require('./src/videos');

let app = express();

// leyfa express að bera static skjöl
app.use(express.static(path.join(__dirname, 'public')));

// leyfir view aðgang að util föllum
app.locals.util = require('./src/util');

// lætur express vita hvar ejs template eru og að við
// erum að nota ejs engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', videos);

function notFoundHandler(req, res, next) {
  const title = 'Fannst ekki';
  const message = 'Ó nei, efnið finnst ekki';
  console.log('not found');
  res.status(404).render('error');
}

function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(500).render('error');
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`)
});