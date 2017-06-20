var keystone = require('keystone');
var async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

	locals.data = {
		categories: [],
		topSellers: [],
		tags: [],
		products: [],
		newproducts: [],
		bestproducts: [],
		specialproducts: [],
		posts: []
	}

	// Load < 5 top seller
	view.on('init', function(next) {

		var q = keystone.list('TopSeller').model.find().limit(2);

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

	// Load products
	view.on('init', function(next) {
		var start = new Date();
		start.setHours(0, 0, 0, 0);

		var end = new Date();
		end.setHours(23, 59, 59, 999);
		// var q = keystone.list('ProductItem').model.find({publishedDate: {$gte: start, $lt: end}});
		var q = keystone.list('ProductItem').model.find().sort('publishedDate').limit(3);
		q.exec(function(err, results) {
			locals.data.newproducts = results;
			next(err);
		});

	});

	// Load products
	view.on('init', function(next) {
		var q = keystone.list('ProductItem').model.find({
			star: 5
		});
		q.exec(function(err, results) {
			locals.data.specialproducts = results;
			next(err);
		});

	});


	// Load the current post
	view.on('init', function(next) {
		var q = keystone.list('Category').model.find({child: false}).populate('categories');

		q.exec(function(err, result) {
			locals.data.categories = result;
			next(err);
		});

	});



	// Load products
	view.on('init', function(next) {

		var q = keystone.list('ProductItem').model.find();

		q.exec(function(err, results) {
			locals.data.products = results;
			next(err);
		});

	});

	// Load post
	view.on('init', function(next) {
		var q = keystone.list('Post').model.find().sort({publishedDate: -1}).limit(3);
		q.exec(function(err, results) {
			locals.data.posts = results;
			console.log('result',results );
			next(err);
		});

	});


	// Render the view
	view.render('index');
};
