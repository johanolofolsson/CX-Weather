// Dependencies
const express = require('express');
const router = express.Router();

const request = require('request');
const jwt = require('jsonwebtoken');



// Data
const fs = require('fs');
const installsData = fs.readFileSync('./data/installs.json');



// TODO: https://www.youtube.com/watch?v=mbsmsi7l3r4&ab_channel=WebDevSimplified
const JWTpayload = '';

router.post('/', (req, res) => {
  // const JWTsecret = req.body.secret;
  // console.log(JWTsecret);
  const installBody = JSON.stringify(req.body, null, 2);
  fs.writeFile('./data/installs.json', installBody, (err) => {
    if (err) {

      res.status(500).json({
        message: 'Unable to save install details',
      });

    } else {

      res.status(200).json({
        message: 'Install details saved',
        // auth: req.headers.authorization,
        sig: req.body.secret
      });

    };

  });
  // TODO: check headers
  
  // TODO: log body / later parse and assign to vars
  // TODO: write to a JSON file, record 'tenants' who install the app
});



module.exports = router;