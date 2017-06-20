// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').config();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'phuquy',
	'brand': 'phuquy',

	'sass': 'public',
	'static': 'public',
	'favicon': 'public/images/logo.svg',
	'views': 'templates/views',
	'view engine': '.hbs',

	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs',
	}).engine,

	'emails': 'templates/emails',

	'auto update': true,
	//  'mongo': 'mongodb://itachi:phuquy@ds129610.mlab.com:29610/phuquyahihi',
	 'mongo': process.env.MONGO_URI || 'mongodb://itachi:phuquy@ds129610.mlab.com:29610/phuquyahihi',
	// 'cloudinary config': { cloud_name: 'dsntngtdx', api_key: '392815345381645', api_secret: '0A1cZPsj1cBAQleWEeojUYmTmmM' },
	'cloudinary config': 'cloudinary://392815345381645:0A1cZPsj1cBAQleWEeojUYmTmmM@dsntngtdx',
	'cookie secret': 'aa31290d25d1b1c2cee116328f712a8e633fdceb58ffbfdd7efac5a8afd8b735225387f810373170f6ce89199633e7c5492c8c4bfd350414da47d90a3aa2acca',
	'signin logo': ['/images/logo.svg', 200, 200],
	'session': true,
	'auth': true,
	'user model': 'User',
});

// Load your project's Models
keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js
keystone.set('locals', {
	_: require('lodash'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable,
	ga_property: keystone.get('ga property')
});

// Load your project's Routes
keystone.set('routes', require('./routes'));



// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	galleries: 'galleries',
	enquiries: 'enquiries',
	'posts': ['posts', 'post-categories', 'post-comments'],
	'categories': ['categories'],
	'products': ['product-items', 'product-comments', 'shippings'],
	'Information': 'information',
	'Tags': 'tags',
	booking: 'bookings',
	users: 'users',
});

// Start Keystone to connect to your database and initialise the web server


if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
	console.log('----------------------------------------'
	+ '\nWARNING: MISSING MAILGUN CREDENTIALS'
	+ '\n----------------------------------------'
	+ '\nYou have opted into email sending but have not provided'
	+ '\nmailgun credentials. Attempts to send will fail.'
	+ '\n\nCreate a mailgun account and add the credentials to the .env file to'
	+ '\nset up your mailgun integration');
}


keystone.start();
