const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

const express = require('express');

const router = express.Router();

/**
 * Kallar á fall og grípur allar runtime villur sem koma upp og heldur áfram niður
 * middleware listann.
 * @param {function} fn
 */
function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Les gögn async úr JSON
 */
async function readVideos() {
  const file = await readFileAsync('./videos.json');
  const json = JSON.parse(file);
  return json;
}

/**
 * Route handler sem birtir heimasíðu
 *
 * @param {object} req Request hlutur
 * @param {object} res Respond hlutur
 */
async function list(req, res, next) { // eslint-disable-line
  const json = await readVideos();
  const title = 'Vídeoleigan';
  const {
    videos,
    categories,
  } = json;
  res.render('videos', { title, videos, categories });
}

/**
 * Finnur myndband í lista sem hefur id id
 * @param {Number} id Id fyrir myndband sem leitað er að
 * @param {object} videos listi af video hlutum
 */
async function findVideo(id, videos) {
  let videoFound;
  const numId = Number(id);
  videos.forEach((video) => {
    if (video.id === numId) {
      videoFound = video;
    }
  });
  if (videoFound) {
    return videoFound;
  }
  return false;
}

/**
 * Route handler sem að birtir síðu fyrir myndbönd
 * @param {object} req Request hlutur
 * @param {object} res Respond hlutur
 * @param {object} next
 */
async function showVideo(req, res, next) {
  const { slug } = req.params;
  if (slug !== 'video') {
    return next();
  }
  const { id } = req.query;

  const json = await readVideos();
  const { videos } = json;
  const video = await findVideo(id, videos);

  if (!video) {
    return next();
  }

  const { title } = video;

  res.render('video', { title, video, videos });
  return '';
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(showVideo));

module.exports = router;
