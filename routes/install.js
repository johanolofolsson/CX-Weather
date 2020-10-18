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
firebase.initializeApp({
  credential: firebase.credential.cert(
    JSON.parse(Buffer.from(process.env.FIREBASE_CREDENTIALS, 'base64').toString('ascii'))), // https://stackoverflow.com/a/61844642
  databaseURL: 'https://' + process.env.FIRESTORE_DB + '.firebaseio.com'
});

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true }); 



/*
 * AMS TO APP
 */
router.post('/', auth, (req, res) => {
  const installBody = req.body;
  const installUUID = installBody.applicationInstall.uuid; //TODO: consider using `req.payload.aud` instead
  const installTime = new Date(req.payload.iat * 1000);
  const productSub = req.payload.sub;
  const tenantID = req.payload["o.a.p.ctenantId"];

  console.log("Install payload: %j", req.payload); //TODO: temporary, replace this with Firestore
  console.log("Install body: %j", req.body) //TODO: temporary, replace this with Firestore


  /* Save to Firestore */
  async function saveInstall() {
    const installRef = db.collection('installs').doc(installUUID);

    try {
      await installRef.set({
        installTime: installTime,
        productSub: productSub,
        tenantID: tenantID
      }); 
      await db.runTransaction(async (t) => {
        const doc = await t.get(installRef);
      });
      res.status(200).json({
        message: 'Install saved successfully',
        installUUID: installRef.id
      });

      console.log('Install saved successfully');
      
    } catch (e) {
      res.status(500).json({
        message: 'Unable to save install details. ' + e
      });

      console.log('Unable to save install details. ' + e);
    }

  } saveInstall();
  
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
};



module.exports = router;