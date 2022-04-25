const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validate: {
      validator: function () {
        if((!this.isModified('description') && this.video)) return true;
        if(!this.description && !this.video) return false;
      },
      message: 'Должно присутствовать либо описание, либо видео урока!'
    }
  },
  video: {
    type: String,
    validate: {
      validator: function () {
        if((!this.isModified('video') && this.description)) return true;
        if(!this.video && !this.description) return false;
      },
      message: 'Должно присутствовать либо видео, либо описание урока!'
    }
  }
});

const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  lessons: [LessonSchema]
});

const StudentSchema = new mongoose.Schema({
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
    type: String
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
  }
});

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;