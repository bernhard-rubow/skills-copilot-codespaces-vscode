// create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const comments = require('./comments.json');

// use express middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// get all comments
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

// add a comment
app.post('/api/comments', (req, res) => {
  const comment = {
    id: comments.length + 1,
  }
});