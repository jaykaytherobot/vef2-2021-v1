const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

const express = require('express');

const router = express.Router();


/**
 * Les gögn async úr JSON
 */
async function readVideos(){
  const file = await readFileAsync('./videos.json');
  const json = JSON.parse(file);
  return json;
}

/**
 * 
 * @param {object} req 
 * @param {object} res 
 * @param {object} next 
 */
function hello(req, res, next){
  let title = 'videos';
  res.render('videos', { title });
}

/**
 * Route handler sem birtir heimasíðu
 * 
 * @param {object} req Request hlutur
 * @param {object} res Respond hlutur
 */
async function list(req, res, next) {
  const json = await readVideos();
  const title = 'Vídeoleigan';
  const {
    videos,
    categories
  } = json;
  res.render('videos', {title, videos, categories});
}


router.get('/', list);
router.get('/:slug', list);

module.exports = router;