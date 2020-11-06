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

  /* Check for Install in Firestore */ 
  async function checkInstall() {
    const installRef = db.collection('installs').doc(installUUID);
    const doc = await installRef.get();

    if (!doc.exists) {
      console.log('Config: Install details not found.');

      /* Display error page */
      res.render('config-error.njk');

    } else {
      console.log('Config: Install details found.');
          
      /* Display config page */
      res.render('config.njk');
    }

  } checkInstall();

  /* Update Config page */
  //TODO: Display save confirmation on config page
  
});

/* For testing things without API */
router.get('/test', (req, res) => { 
  res.render('config.njk');
});
router.get('/test-error', (req, res) => { 
  res.render('config-error.njk');
});



/*
 * AMS TO APP: SAVE CONFIG
 */
router.post('/save', auth, (req, res) => {
  const installUUID = req.body.installUuid;
  const appConfig = req.body.payload;
  const appConfigTime = new Date(Date.now());

  console.log("App config payload: %j", req.payload); //TODO: temporary, replace this with Firestore
  console.log("App config body: %j", req.body) //TODO: temporary, replace this with Firestore


  /* Save to Firestore */ 
  async function saveConfig() {
    const installRef = db.collection('installs').doc(installUUID);

    try {
      await installRef.update({
        appConfig: [appConfig],
        appConfigTime: appConfigTime
      }); 

      await db.runTransaction(async (t) => {
        const doc = await t.get(installRef);

        const appConfiguration = doc.data().appConfig;
        console.log("App Config = %j", + appConfiguration);

        if (appConfiguration != null) {
          res.status(200).json({
            configurationStatus: 'CONFIGURED',
            // payload: appConfiguration
          });

          console.log('App config saved successfully');

        } else {

          res.status(500).json({
            configurationStatus: 'ERROR'
          });

          console.log('Unable to save app config.');
        }
      });

    } catch (e) {
      res.status(500).json({
        configurationStatus: 'ERROR'
      });

      console.log('Unable to save app config. ' + e);
    }

  } saveConfig();
  //TODO: Handle AMS save-config
  //TODO: Save config to Firestore
  //TODO: Status 200 to AMS
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