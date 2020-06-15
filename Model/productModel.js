const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, 'Product Name is Required'],
      trim: true
    },
    slug: String,
    stock: Number,
    additionalInfo: String,
    price: {
      type: Number,
      required: [true, 'Product Price is Required']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    businessUser: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'BusinessUser'
      }
    ],

    date: { type: Date, default: Date.now }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
productSchema.virtual('orders', {
  ref: 'Order',
  foreignField: 'product',
  localField: '_id'
});

productSchema.pre('save', function(next) {
  this.slug = slugify(this.productName, { lower: true });
  next();
});

// productSchema.pre(/^find/, function(next) {
//   this.populate({
//     path: 'orders',
//     select: ''
//   });
//   next();
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
