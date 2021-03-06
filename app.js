const path = require('path');
const express = require('express');
const videos = require('./src/videos');

const app = express();

// leyfa express að bera static skjöl
app.use(express.static(path.join(__dirname, 'public')));

// leyfir view aðgang að util föllum
app.locals.util = require('./src/util');

// lætur express vita hvar ejs template eru og að við
// erum að nota ejs engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// notar Router frá videos.js
app.use('/', videos);

/**
 * Middleware fyrir 404 not found villur
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function notFoundHandler(req, res, next) { // eslint-disable-line
  const title = 'Fannst ekki';
  const message = 'Ó nei, efnið finnst ekki';
  res.status(404).render('error', { title, message });
}

/**
 * Middleware sem sér um villumeðhöndlun.
 * @param {object} err
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function errorHandler(err, req, res, next) { // eslint-disable-line
  const title = 'Villa kom upp';
  const message = 'æi, það kom upp villa';
  res.status(500).render('error', { title, message });
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
  console.info(`Server running at http://${hostname}:${port}/`); // eslint-disable-line
});
