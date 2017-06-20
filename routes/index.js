/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */

var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.theme);
keystone.pre('render', middleware.flashMessages);
keystone.pre('routes', middleware.initErrorHandlers);
// keystone.pre('render', middleware.requireUser);

// Handle 404 errors
keystone.set('404', function (req, res, next) {
	res.status(404).render('errors/404', {
		layout: "order"
	});
});

// Handle other errors
keystone.set('500', function (err, req, res, next) {
	var title, message;
	if (err instanceof Error) {
		message = err.message;
		err = err.stack;
	}
	res.err(err, title, message);
});

// Import Route Controllers
var routes = {
	download: importRoutes('./download'),
	views: importRoutes('./views'),
	angular: importRoutes('./angular'),
	api: importRoutes('./api'),
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Angular


	app.use(require('prerender-node'));


	// app.get('/home', routes.views.index);
	// app.get('/gallery', routes.views.gallery);
	// app.get('/products', routes.views.products);
	// app.get('/products/:product', routes.views.product);
	// app.get('/blog/:category?', routes.views.blog);
	// app.get('/category/:category?', routes.views.category);
	// app.get('/blog/post/:post', routes.views.post);
	// app.all('/contact', routes.views.contact);
	//app.get('/checkout', routes.views.checkout);

	// Downloads
	// app.get('/download/users', routes.download.users);
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

	// Posts
	app.get('/api/posts', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.list);
	app.get('/api/posts/slide', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.listSlide);
	app.get('/api/posts/:slug', [keystone.middleware.api, keystone.middleware.cors], routes.api.posts.get);

	// Categories
	app.get('/api/categories', [keystone.middleware.api, keystone.middleware.cors], routes.api.categories.list);
	app.get('/api/categories/:key', [keystone.middleware.api, keystone.middleware.cors], routes.api.categories.get);

	app.get('/api/categories/:key/products', [keystone.middleware.api, keystone.middleware.cors], routes.api.products.byCategory);

	// Products
	app.get('/api/products', [keystone.middleware.api, keystone.middleware.cors], routes.api.products.list);
	app.get('/api/products/:slug', [keystone.middleware.api, keystone.middleware.cors], routes.api.products.get);
	app.get('/api/products/search/:name', [keystone.middleware.api, keystone.middleware.cors], routes.api.products.search);

	// Tags
	app.get('/api/tags', [keystone.middleware.api, keystone.middleware.cors], routes.api.tags.list);

	// Shippings
	app.get('/api/shippings', [keystone.middleware.api, keystone.middleware.cors], routes.api.shipping.list);

	// Authentication
	app.post('/api/authentication', [keystone.middleware.api, keystone.middleware.cors], routes.api.session_auth.signin);

	// Signout
	app.delete('/api/authentication/signout', [keystone.middleware.api, keystone.middleware.cors], routes.api.session_auth.signout);

	// Add a booking
	app.post('/api/bookings', [keystone.middleware.api, keystone.middleware.cors], routes.api.booking.create);

	// Add a feedback
	app.post('/api/feedback', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiries.create);

	// Comments for post
	app.get('/api/comments/post/:slug', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_comment.list);
	app.post('/api/comments/post/', [keystone.middleware.api, keystone.middleware.cors], routes.api.post_comment.create);

	// Comments for product
	app.get('/api/comments/product/:slug', [keystone.middleware.api, keystone.middleware.cors], routes.api.product_comment.list);
	app.post('/api/comments/product/', [keystone.middleware.api, keystone.middleware.cors], routes.api.product_comment.create);

	// Account
	app.get('/api/user/current', [keystone.middleware.api, keystone.middleware.cors], routes.api.user.currentUser);
	app.post('/api/user/create', [keystone.middleware.api, keystone.middleware.cors], routes.api.user.create);

	// Contact Us
	app.post('/api/enquiry/create', [keystone.middleware.api, keystone.middleware.cors], routes.api.enquiries.create);

	// Informations
	app.post('/api/information', [keystone.middleware.api, keystone.middleware.cors], routes.api.information.list);

	//app.get('/*', routes.angular.index);


	app.get('/*', function(req, res){
		res.sendfile('./public/views/index.html');
	});


};
