var keystone = require('keystone');

exports = module.exports = function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'home';

	locals.data = {
		categories: [],
		topSellers: [],
		tags: [],
		products: []
	};

	locals.filters = {
		category: req.params.category,
	};

	// Load the current post
	view.on('init', function(next) {

		var q = keystone.list('Category').model.find({
			child: false
		}).populate('categories');

		q.exec(function(err, result) {
			locals.data.categories = result;
			next(err);
		});

	});

	// Load < 5 top seller
	view.on('init', function(next) {

		var q = keystone.list('TopSeller').model.find();

		q.exec(function(err, results) {
			locals.data.topSellers = results;
			next(err);
		});

	});

	// Load tags
	view.on('init', function(next) {

		var q = keystone.list('Tag').model.find();

		q.exec(function(err, results) {
			locals.data.tags = results;
			next(err);
		});

	});

	// Load the current category filter
	view.on('init', function(next) {
		if (req.params.category) {
			keystone.list('Category').model.findOne({
				key: locals.filters.category
			}).exec(function(err, result) {
				locals.data.category = result;
				next(err);
			});
		} else {
			next();
		}
	});

	//Test IU, lxthinh
	// Load products
	// view.on('init', function(next) {
	// 	var q = keystone.list('ProductItem').model.find({
	// 		star: 5
	// 	});
	// 	q.exec(function(err, results) {
	// 		locals.data.products = results;
	// 		next(err);
	// 	});
	//
	// });

	// Load the posts
	view.on('init', function(next) {

		var filters = {};

		if (locals.data.category) {
			filters.categories = locals.data.category;
		}
		var q = keystone.list('ProductItem').paginate({
			page: req.query.page || 1,
			perPage: 10,
			maxPages: 10,
			filters: filters,
		});

		q.exec(function(err, results) {
			locals.data.products = results;
			next(err);
		});
	});

	// Render view
	view.render('category');
}
