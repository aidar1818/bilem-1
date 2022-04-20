const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  module: {
    type: Schema.Types.ObjectId,
    ref: 'Module',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  video: String,
  description: String,
});

const Lesson = mongoose.model('Lesson', LessonSchema);

module.exports = Lesson;
