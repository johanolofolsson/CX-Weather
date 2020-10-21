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
 * AMS TO APP: CONFIG
 */
router.post('/', auth, (req, res) => {
  const installBody = req.body;
  const installUUID = installBody.applicationInstall.uuid;
  // const ConfigTime = new Date(req.payload.iat * 1000);
  
  console.log("Config payload: %j", req.payload); //TODO: temporary, replace this with Firestore
  console.log("Config body: %j", req.body) //TODO: temporary, replace this with Firestore

  /* Display Config page */
  res.render('config.njk');

  /* Update Config page */
  //TODO: Display save confirmation on config page
  
});



/*
 * FORM TO APP
 *
 * Also posts data back to AMS
 */
router.post('/submit', (req, res) => {
  //TODO: Post form submit back to AMS
  console.log(req.body.temp_unit);
  res.end()
});



/*
 * AMS TO APP: SAVE CONFIG
 */
router.post('/save', auth, (req, res) => {
  //TODO: Handle AMS save-config
  //TODO: Save config to Firestore
  //TODO: Status 200 to AMS
  //TODO: Send payload, for config page
});



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