var keystone = require('keystone');
var Types = keystone.Field.Types;

var ProductItem = new keystone.List('ProductItem', {
    map: {name: 'name'},
    singular: 'Product',
    plural: 'Products',
    autokey: {path: 'slug', from: 'name', unique: true}
});

ProductItem.add({
  name: {type: String, required: true, text: true},
  price: {type: Number},
  qty: {type: Number},
  star: {type: Number},
  isnew: {type: Boolean},
  forSale: {type: Boolean},
  inStock: {type: Boolean},
  newprice: {type: Number},
  percentsale: {type: Number},
  description: {type: Types.Html, wysiwyg: true, height:300},
  image: {type: Types.CloudinaryImage},
  imageDetails: {type: Types.CloudinaryImages},
  imagehover: {type: Types.CloudinaryImage},
  publishedDate: {type: Date, default: Date.now},
  video: {type: Types.Url},
  categories: { type: Types.Relationship, ref: 'Category', many: true },
});

ProductItem.register();
