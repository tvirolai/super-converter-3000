"use strict";

var q = require('q');
var React = require('react');
var RecordView = require('./RecordView');
var axios = require('axios');
var Record = require('marc-record-js');

var RecordValidator = require('./record_validator');

var validator = new RecordValidator();
validator.registerValidator( require('marc-record-validate/validators/Alias') );

var currentId;

window.addEventListener("load", function() {
	
	window.addEventListener("hashchange", function() {

		handleRoute(window.location.hash);
		
	});

	function handleRoute(hash) {
		var id = hash.match(/\d+/);
	
		if (id !== null) {
			id = parseInt(id[0], 10);
			currentId = id;
			axios.get(`/record/${id}`).then(render).catch(handleError);
		}
	}
	
	if (window.location.hash === "") {
		window.location.hash = 1;
	}

	handleRoute(window.location.hash);

	document.getElementById('next').addEventListener('click', function() {
		window.location.hash = ++currentId;
	});
	document.getElementById('prev').addEventListener('click', function() {
		window.location.hash = --currentId;
	});
});

var ErrorView = React.createClass({
	render: function() {
		return (
			<div>Error {this.props.error.status} - {this.props.error.data}</div>
		);
	}
});

function handleError(error) {
	console.error(error);
	React.render(
		React.createElement(ErrorView, {
			error: error
		}),
		document.getElementById("originalRecord")
	);

	var div = document.getElementById('convertedRecord');
	while(div.firstChild){
	    div.removeChild(div.firstChild);
	}


}
function render(response) {
	
	var record = new Record(response.data);

	React.render(
		React.createElement(RecordView, {
			record: record
		}),
		document.getElementById("originalRecord")
	);

	validator.fix(record).then(function(fixedRecord) {
		
		React.render(
			React.createElement(RecordView, {
				record: fixedRecord
			}),
			document.getElementById("convertedRecord")
		);

	});


}
