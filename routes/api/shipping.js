var async = require('async'),
	keystone = require('keystone');

var Shipping = keystone.list('Shipping');

/**
 * List Categories
 */
exports.list = function(req, res) {
	Shipping.model.find().exec(function(err, items) {

		if (err) return res.apiError('database error', err);
		res.apiResponse(items);
	});
};
