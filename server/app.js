const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const favicon = require('serve-favicon');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));

app.use('/', require('./routes'));

module.exports = app;
