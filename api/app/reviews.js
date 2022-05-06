const express = require('express');
const Review = require("../models/Review");
const router = express.Router();

router.get('/course/:id', async (req, res, next) => {
    try {
        const reviews = await Review.find({course: req.params.id}).populate({
            path: 'user course',
            select: 'displayName title'
        })

        return res.send(reviews);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
