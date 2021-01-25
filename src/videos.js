const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

const express = require('express');

const router = express.Router();

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}


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

async function findVideo(id, videos) {
  let videoFound;
  videos.forEach((video) => {
    if(video.id == id) {
      videoFound = video;
    }
  });
  if(videoFound){
    return videoFound;
  }
  return false;
}

async function showVideo(req, res, next) {
  const { slug } = req.params;
  const { id } = req.query;
  
  const json = await readVideos();
  const { videos } = json;
  const video = await findVideo(id, videos);


  if(!video){
    return next();
  }

  const title = 'Vídeoleigan';

  res.render('video', {title, video, videos});
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(showVideo));

module.exports = router;