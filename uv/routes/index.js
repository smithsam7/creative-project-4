var express = require('express');
const fs = require('fs');
const https = require('https');
var router = express.Router();
var request = require('request');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: 'public'});
});

var options = { method: 'GET',
 url: 'https://api.openuv.io/api/v1/uv',
 qs: { lat: '-33.34', lng: '115.342', dt: '2018-01-24T10:50:52.283Z' },
 headers: 
  { 'content-type': 'application/json',
    'x-access-token': '000e9abbae7bf50afc5e711f76a0801a' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});


module.exports = router;


