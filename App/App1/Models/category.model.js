// category.model.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Category
let Category = new Schema({
  category_name: {
    type: String
  },
  is_active: {
    type: Number
  },
  category_description: {
    type: String
  }
},{
  collection: 'category'
});

module.exports = mongoose.model('Category', Category);
