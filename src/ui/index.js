"use strict";

var q = require('q');
var React = require('react');
var RecordView = require('./RecordView');

var RecordValidator = require('./record_validator');

var validator = new RecordValidator();
validator.registerValidator( require('marc-record-validate/validators/Alias') );


window.addEventListener('load', function() {
	console.log("Application started at " + new Date());

	var record = {
		leader: "moi",
		fields: [
			{tag: "001", value:"213"},
			{tag: "020", subfields: [
				{code:'q', value:"inb."}
			]}
		]
	};

	React.render(
		React.createElement(RecordView, {
			record: record
		}),
		document.getElementById("originalRecord")
	);

	validator.fix(record).then(function(fixedRecord) {
		console.log("fix ok", fixedRecord);
		React.render(
			React.createElement(RecordView, {
				record: fixedRecord
			}),
			document.getElementById("convertedRecord")
		);

	});



});
