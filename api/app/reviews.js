const express = require('express');
const Review = require("../models/Review");
const Course = require("../models/Course");
const auth = require("../middleware/auth");

const router = express.Router();

router.get('/course/:id', async (req, res, next) => {
    try {
        const reviews = await Review.find({course: req.params.id}).sort({_id: -1}).populate({
            path: 'user course',
            select: 'displayName title'
        })

        return res.send(reviews);
    } catch (e) {
        next(e);
    }
});

router.post('/:id', auth, async (req, res, next) => {
    try {
        const isStudentOfCourse = req.user.myCourses.find(c => {
            return c.course._id.toString() === req.params.id;
        });
        if (!isStudentOfCourse) {
            return res.status(403).send({error: 'Вы не являетесь студентом данного курса'});
        }

        const [existReview] = await Review.find({user: req.user._id, course: req.params.id});
        let review;

        if (existReview) {
            if (req.body.text) {
                existReview.text = req.body.text;
            }
            if (req.body.rate) {
                existReview.rate = req.body.rate;
            }

            await existReview.save();
        } else {
            review = new Review({
                user: req.user._id,
                course: req.params.id,
                text: req.body.text,
                rate: req.body.rate,
            });

            await review.save();
        }

        const course = await Course.findById(req.params.id);
        const reviews = await Review.find({course: req.params.id});
        const ratesSum = reviews.reduce((previousValue, currentValue) => previousValue + currentValue.rate, 0);
        const averageValue = Math.round((ratesSum / reviews.length) * 10) / 10;
        course.rate = averageValue;
        await course.save();

        const reviewToSave = existReview ? existReview : review;
        return res.send(reviewToSave);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', auth, async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id).populate('user');

        if (!review) {
            return res.status(422).send({error: 'Отзыв не найден'});
        }

        if (review.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).send({error: 'Вы не являетесь студентом данного курса!'});
        }

        await Review.deleteOne({_id: req.params.id});
        return res.send({message: `Deleted review id = ${req.params.id}`});
    } catch (e) {
        next(e);
    }
});

module.exports = router;
