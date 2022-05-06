const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Course',
    },
    text: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    datetime: {
        type: Date,
        default: Date.now()
    }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
