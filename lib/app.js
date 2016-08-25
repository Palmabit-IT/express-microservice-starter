'use strict';

require('dotenv').config({path: '.env' + (process.env.NODE_ENV ? '.' + process.env.NODE_ENV : '')});

const express = require('express');
const http = require('http');
const morgan = require('morgan');
const logger = require('./logger');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const utils = require('./utils');

const errorHandler = require('./errors').errorHandler;
const port = utils.normalizePort(process.env.APP_PORT || '3000');

/**
 * set routes folder
 */
const ROUTES_FOLDER = process.cwd() + '/lib/routes/';
let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('combined', {
  stream: logger.stream
}));

//app.use('/', require('./routes/index'));

const routes = [
  'index',
  'heartbeat'
];
routes.forEach(function loadRoutes(file) {
  app.use('/', require(ROUTES_FOLDER + file));
  logger.info('Route ' + file + ' loaded');
});

app.use(errorHandler);

app.set('port', port);
logger.info('Listen on http://localhost:', port);

let server = http.createServer(app);
server.listen(port);

module.exports = server;
