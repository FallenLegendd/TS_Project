const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const removeHttpHeader = require('../middleware/removeHttpHeader');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: [process.env.CLIENT_URL],
  credentials: true,
};

const serverConfig = (app) => {
  app.use(morgan('dev'));
  app.use(cors(corsOptions));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(removeHttpHeader);
  app.use(express.static(path.resolve(__dirname, '..', 'public')));
  app.use(cookieParser());
};

module.exports = serverConfig;
