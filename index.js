"use strict";

var MelindaClient = require('melinda-api-client');
var express = require('express');

var config = {
    endpoint: "http://melinda.kansalliskirjasto.fi/API/v1/",
    user: process.env.melinda_batch_username,
    password: process.env.melinda_batch_password
};

var client = new MelindaClient(config);

var app = express();
app.use(express.static('public'));

app.get('/:id', function (req, res) {

  res.send('Hello World!' + req.params.id);
});

app.get('/record/:id', function(req, res) {

	console.log("Loading record " + req.params.id);	
	client.loadRecord(req.params.id, function(record) {
		console.log(record);	
		res.send(record);
	}).catch(function(err) {
		console.log(err);
		res.send(err);
	}).done();


});

var server = app.listen(3001, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


