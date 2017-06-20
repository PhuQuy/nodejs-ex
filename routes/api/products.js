var async = require('async'),
	keystone = require('keystone');

var Product = keystone.list('ProductItem');
var Category = keystone.list('Category');

/**
 * List Products
 */
exports.list = function(req, res) {
	var q = req.query.q;
	if (q == 'accessories') {
		var slug = req.query.key;
		Product.model.findOne({
			'slug': slug
		}, 'categories', function(err, product) {
			if (err) return res.apiError('database error', err);
			Product.model.find({
					'categories': {
						$in: product.categories
					}
				})
				.limit(6)
				.exec(function(err, products) {
					if (err) return res.apiError('database error', err);
					res.apiResponse(products);
				})
		})

	} else {

		var query = Product.model.find({});
		if (q == 'isTop') {
			query = Product.model.find({
				publishedDate: -1
			}).limit(6);
		} else if (q == 'new') {
			query = Product.model.find({
				isnew: true
			}).limit(6);

		} else if (q == 'bestSeller') {
			query = Product.model.find({
				star: 4
			}).limit(6);
		}else if (q == 'special') {
			query = Product.model.find({
				star: 5
			}).limit(6);
		}
		query.exec(function(err, items) {
			if (err) return res.apiError('database error', err);
			res.apiResponse(items);
		});

	}


};

exports.get = function(req, res) {
	Product.model.findOne().where('slug', req.params.slug).populate('categories', 'key').exec(function(err, item) {
		if (err) return res.apiError('database error', err);
		if (!item) return res.apiError('not found');
		res.apiResponse(
			item
		);
	});
};


exports.byCategory = function(req, res) {
	Category.model.findOne().populate('categories').where('key', req.params.key).exec(function(err, category) {
		if (!category) return res.apiError('not found');

		if (req.query.sort) {
			var sort = req.query.sort;
			console.log(sort);
			var sortValue = req.query.sortValue;
			console.log(sortValue);

			if(sort === 'price') {
				Product.model.find({}).sort({
					price: sortValue
				}).where('categories').in([category.id]).exec(function(err, items) {

					if (err) return res.apiError('database error', err);
					res.apiResponse(items);
				});
			} else if(sort === 'name') {
				Product.model.find({}).sort({
					name: sortValue
				}).where('categories').in([category.id]).exec(function(err, items) {

					if (err) return res.apiError('database error', err);
					res.apiResponse(items);
				});
			} else if(sort === 'instock') {
				Product.model.find({inStock: true}).where('categories').in([category.id]).exec(function(err, items) {

					if (err) return res.apiError('database error', err);
					res.apiResponse(items);
				});
			}
		} else {
			Product.model.find({}).where('categories').in([category.id]).exec(function(err, items) {

				if (err) return res.apiError('database error', err);
				res.apiResponse(items);
			});
		}
	});
};

exports.search = function(req, res) {
	var search = req.params.name;
	console.log(search);
	// Product.model.find({"name" : {$regex : search}}).exec(function(err, items) {

	Product.model.find({
		$text: {
			$search: search
		}
	}).exec(function(err, items) {
		if (err) return res.apiError('database error', err);
		res.apiResponse(items);
	});
};
