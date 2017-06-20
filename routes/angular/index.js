var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	
	// Render the view
	view.render('index', { layout: 'angular'});
};
