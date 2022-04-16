const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category',
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  quantity: {
    type: Number,
    default: 0,
  },
});

const Subcategory = mongoose.model('Subcategory', SubcategorySchema);

module.exports = Subcategory;
