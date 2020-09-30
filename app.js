// Dependencies
const express = require('express'); // Server
const app = express();


require('dotenv').config(); // For secrets
const crypto = require('crypto'); // For HMAC support
app.use(express.json()); // To parse JSON body


const installRoutes     = require('./routes/install');
// const configRoutes    = require('./routes/config');
// const statusRoutes    = require('./routes/status');
// const uninstallRoutes = require('./routes/uninstall');

// const serviceConfigRoutes  = require('./routes/service/config');
// const serviceStatusRoutes  = require('./routes/service/status');
// const serviceInvokeRoutes  = require('./routes/service/invoke');
// const serviceCreateRoutes  = require('./routes/service/create');
// const serviceDeleteRoutes  = require('./routes/service/delete');
// const serviceWeatherRoutes = require('./routes/service/weather');



// Routes
app.use('/install',     installRoutes);
// app.use('/config',    configRoutes);
// app.use('/status',    statusRoutes);
// app.use('/uninstall', uninstallRoutes);

// app.use('service/config',  serviceConfigRoutes);
// app.use('service/status',  serviceStatusRoutes);
// app.use('service/invoke',  serviceInvokeRoutes);
// app.use('service/create',  serviceCreateRoutes);
// app.use('service/delete',  serviceDeleteRoutes);
// app.use('service/weather', serviceWeatherRoutes);



module.exports = app;