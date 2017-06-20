var async = require('async'),
	keystone = require('keystone');

var Information = keystone.list('Information');

/**
 * List Informations
 */
exports.list = function(req, res) {
	Information.model.findOne().exec(function(err, items) {

		if (err) return res.apiError('database error', err);
		res.apiResponse(items);
	});
};
