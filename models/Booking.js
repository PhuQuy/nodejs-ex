var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Booking Model
 * =============
 */

var Booking = new keystone.List('Booking', {
	nocreate: true,
	noedit: true,
});

Booking.add({
	name: { type: String, required: true },
	email: { type: Types.Email, required: true },
	phone: { type: String },
	address: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
	cart: { type: Types.Relationship, ref: 'Cart', many: true },
});

Booking.schema.pre('save', function (next) {
	this.wasNew = this.isNew;
	next();
});

Booking.schema.post('save', function () {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Booking.schema.methods.sendNotificationEmail = function (callback) {
	if (typeof callback !== 'function') {
		callback = function (err) {
			if (err) {
				console.error('There was an error sending the notification email:', err);
			}
		};
	}

	if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
		console.log('Unable to send email - no mailgun credentials provided');
		return callback(new Error('could not find mailgun credentials'));
	}

	var booking = this;
	var brand = keystone.get('brand');

	keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
		if (err) return callback(err);
		new keystone.Email({
			templateName: 'booking-notification',
			transport: 'mailgun',
		}).send({
			to: admins,
			from: {
				name: 'phuquy',
				email: 'contact@phuquy.com',
			},
			subject: 'New Booking for phuquy',
			booking: booking,
			brand: brand,
			layout: false,
		}, callback);
	});
};

Booking.defaultSort = '-createdAt';
Booking.defaultColumns = 'name, email, address, createdAt';
Booking.register();
