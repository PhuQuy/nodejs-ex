var async = require('async'),
	keystone = require('keystone');

var User = keystone.list('User');

/**
 * Signin
 */
exports.signin = function(req, res) {

	if (!req.body.email || !req.body.password) {
		return res.json({
			success: false,
			session: false,
			message: 'Sorry, there was an issue signing you in, please try again.'
		});
	}

	keystone.session.signin({
		email: req.body.email,
		password: req.body.password
	}, req, res, function(user) {
		return res.json({
			success: true,
			session: true,
			date: new Date().getTime(),
			user: user
		});

	}, function(err) {

		return res.json({
			success: false,
			session: false,
			message: (err && err.message ? err.message : false) || 'Sorry, there was an issue signing you in, please try again.'
		});
	});
}

exports.signout = function(req, res) {
	keystone.session.signout(req, res, function() {
		res.json({
			'success': true
		});
	});
}

exports.checkAuth = function(req, res, next) {
  // you could check user permissions here too
  if (req.user) return next();
  return res.status(403).json({ 'error': 'no access' });
}
