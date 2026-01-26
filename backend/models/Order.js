const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  items: [{
    type: Object,
  }],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  collection: 'orders' // Specify collection name
});

module.exports = mongoose.model('Order', orderSchema);