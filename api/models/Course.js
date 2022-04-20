const mongoose = require('mongoose');
const Module = require("module");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true
  },
  price: {
    type: Number,
    default: 0,
  },
  image: String,
  is_free: {
    type: Boolean,
    default: true,
  },
  content : {
    type: null | [Module],
  },
  rate: {
    type: Number,
    default: 0.0
  }
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;