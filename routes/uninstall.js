// Dependencies
const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const firebase = require('firebase-admin');



// Data
const db = firebase.firestore();



router.post('/', auth, (req, res) => {
  const installUUID = req.payload.aud;
  const uninstallUUID = req.body.uuid;  
  const uninstallTime = new Date(req.payload.iat * 1000);

  console.log("Uninstall payload: %j", req.payload); //TODO: temporary, replace this with Firestore
  console.log("Uninstall body: %j", req.body) //TODO: temporary, replace this with Firestore


  async function saveUninstall() {
    const installRef = db.collection('installs').doc(installUUID);

    try {
      await installRef.update({
        uninstalled: true,
        uninstallUUID: uninstallUUID,
        uninstallTime: uninstallTime
      }); 

      await db.runTransaction(async (t) => {
        const doc = await t.get(installRef);

        const uninstalled = doc.data().uninstalled;
        console.log('Uninstalled = ' + uninstalled);

        if (uninstalled === true) {
          res.status(200).json({
            message: 'Uninstall saved successfully',
            installUUID: installRef.id
          });

          console.log('Uninstall saved successfully');

        } else {

          res.status(500).json({
            message: 'Unable to save uninstall details.'
          });

          console.log('Unable to save uninstall details.');
        }
      });

    } catch (e) {
      res.status(500).json({
        message: 'Unable to save uninstall details. ' + e
      });

      console.log('Unable to save uninstall details. ' + e);
    }

  }
  
  saveUninstall();
  
});



// https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified
// https://github.com/WebDevSimplified/JWT-Authentication/blob/master/server.js
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