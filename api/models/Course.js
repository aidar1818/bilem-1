const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
});

const LessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validate: {
      validator: async function (value) {
        if (!this.isModified('description')) return true;

        return Boolean(value || this.image);
      },
      message: 'Должно присутствовать либо описание, либо видео урока!',
    },
  },
  image: {
    type: String
  },
  video: {
    type: String,
    validate: {
      validator: async function (value) {
        if (!this.isModified('video')) return true;

        return Boolean(value || this.description);
      },
      message: 'Должно присутствовать либо видео, либо описание урока!',
    },
  },
  comments: [CommentSchema],
});

const ModuleSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: [LessonSchema]
});

const StudentSchema = new Schema({
  type: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  information: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: [StudentSchema],
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true
  },
  modules: [ModuleSchema],
  price: {
    type: Number,
    default: 0,
  },
  image: String,
  is_free: {
    type: Boolean,
    default: true,
  },
  rate: {
    type: Number,
    default: 0.0
  },
  is_published: {
    type: Boolean,
    default: false,
  },
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
