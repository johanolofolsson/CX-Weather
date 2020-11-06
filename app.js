/* 
 * DEPENDENCIES
 */
const express = require('express'); // Server
const app = express();

if (app.get('env') == 'development') { require('dotenv').config(); } // For secrets (development only)
app.use(express.json()); // To parse JSON body

app.use(express.urlencoded({
  extended: true
}))

const nunjucks = require('nunjucks'); // https://stackoverflow.com/a/52326697
nunjucks.configure('views', {
  autoescape: true,
  express: app
});
app.set('view engine', 'njk');


const installRoutes   = require('./routes/install');
const uninstallRoutes = require('./routes/uninstall');
const configRoutes    = require('./routes/config');
// const statusRoutes    = require('./routes/status');

const serviceConfigRoutes  = require('./routes/service/config');
// const serviceStatusRoutes  = require('./routes/service/status');
// const serviceInvokeRoutes  = require('./routes/service/invoke');
// const serviceWeatherRoutes = require('./routes/service/weather');
// const serviceCreateRoutes  = require('./routes/service/create');
// const serviceDeleteRoutes  = require('./routes/service/delete');



/*
 * ROUTES
 */
app.use('/assets', express.static('assets'));

app.use('/install',   installRoutes);
app.use('/uninstall', uninstallRoutes);
app.use('/config',    configRoutes);
// app.use('/status',    statusRoutes);

app.use('/service/config',  serviceConfigRoutes);
// app.use('/service/invoke',  serviceInvokeRoutes);
// app.use('/service/create',  serviceCreateRoutes);
// app.use('/service/delete',  serviceDeleteRoutes);
// app.use('/service/weather', serviceWeatherRoutes);
// app.use('/service/status',  serviceStatusRoutes);



module.exports = app;