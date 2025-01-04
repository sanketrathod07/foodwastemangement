const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },  // Ensure this is provided in the request
  image: { type: String, required: false },    // Make image optional
  rating: { type: Number, required: false, default: 0 }, // Added the rating field
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: false },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
