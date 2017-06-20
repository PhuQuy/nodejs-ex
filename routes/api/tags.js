var async = require('async'),
	keystone = require('keystone');

var Tag = keystone.list('Tag');

/**
 * List Categories
 */
exports.list = function(req, res) {
	Tag.model.find().exec(function(err, items) {

		if (err) return res.apiError('database error', err);
		res.apiResponse(items);
	});
};
