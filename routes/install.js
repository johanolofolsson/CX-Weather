// Dependencies
const express = require('express');
const router = express.Router();

const request = require('request');
const jwt = require('jsonwebtoken');



// Data
const fs = require('fs');
const installsData = fs.readFileSync('./data/installs.json');



router.post('/', auth, (req, res) => {
  const installBody = req.body;
  const installUUID = installBody.applicationInstall.uuid;
  const installTime = req.payload.iat;
  const productSub  = req.payload.sub;
  const tenantID    = req.payload["o.a.p.ctenantId"];

  const installDetails = {
    installID: installUUID,
    installTime: installTime,
    productSub: productSub,
    tenantID: tenantID
  };

  const installDetailsJSON = JSON.stringify(installDetails, null, 2);


  fs.writeFile('./data/installs.json', installDetailsJSON, (err) => {
    if (err) {

      res.status(500).json({
        message: 'Unable to save install details',
      });

    } else {

      res.status(200).json({
        message: 'Install details saved',
        installUUID: installUUID
      });

    };

  });
  
});



// https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified
// https://github.com/WebDevSimplified/JWT-Authentication/blob/master/server.js
function auth(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  console.log(authHeader);
  console.log(token);

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.AMS_SECRET, (err, payload) => {
    console.log(err)
    if (err) return res.sendStatus(403)
    req.payload = payload
    next()
  })
};



module.exports = router;