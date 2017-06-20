var keystone = require('keystone');
var Types = keystone.Field.Types;

var Shipping = new keystone.List('Shipping', {
    map: {name: 'name'},
    autokey: {path: 'slug', from: 'name', unique: true}
});

Shipping.add({
  name: {type: String, required: true, text: true},
  price: {type: Number},
});

Shipping.register();
