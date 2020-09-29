// Dependencies
const express = require('express'); // Server
const app = express();

const crypto = require('crypto'); // For HMAC support

app.use(express.json()); // To parse JSON body



// Routes
const installRoutes = require('./routes/install');
const weatherRoutes = require('./routes/weather');



// app.use('/status', statusRoutes);

app.use('/install', installRoutes);

// app.use('/uninstall', uninstallRoutes);

// app.use('/configure', configureRoutes);

// app.use('/save', saveRoutes);

app.use('/weather', weatherRoutes);



module.exports = app;