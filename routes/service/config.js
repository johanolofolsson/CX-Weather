/*
 * DEPENDENCIES
 */
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const firebase = require('firebase-admin');



/*
 * DATA
 */
const db = firebase.firestore();



/*
 * RESPONSYS TO APP: CONFIG
 */
// TODO: Handle request

/* For testing things without API */
router.get('/test', (req, res) => { 
  res.render('service/config.njk');
});
router.get('/test-error', (req, res) => { 
  res.render('shared/config-error.njk');
});



/*
 * RESPONSYS TO APP: SAVE SERVICE CONFIG
 */
// TODO: Save service config to Firestore



/*
 * JSON WEB TOKEN VERIFICATION
 *
 * https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified
 * https://github.com/WebDevSimplified/JWT-Authentication/blob/master/server.js
 */
function auth(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.AMS_SECRET, (err, payload) => {
    if (err) {
      console.log(err)
      return res.sendStatus(403)
    } else {
      req.payload = payload
      next()
    }
  })
}; //TODO: make this a shared function across routes



module.exports = router;