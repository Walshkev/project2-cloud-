const { Review } = require("../models/review");
const { Business } = require("../models/business");
const { paginate } = require("../lib/utils");

const pageSize = 10;

const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        await review.save();

        await Business.updateOne({ _id: review.businessId }, { $push: { reviews: review.id } })

        res.status(201)
            .send({
                "id": review.id,
                "links": {
                    "self": `/users/${req.params.userId}/reviews/${review.id}`
                }
            });
    } catch (err) {
        res.status(400)
            .json({ "error": "Request did not contain a valid review object" });
    }
};

const getReviews = async (req, res, next) => {
    const page = parseInt(req.query.page || 1);

    const reviews = await Review.find({});
    const pagedReviews = paginate(reviews, page, pageSize);

    if (pagedReviews.length > 0) {
        res.json(pagedReviews);
    } else {
        next();
    }
};

const getReview = async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId).exec();

    if (review) {
        res.json(review);
    } else {
        next();
    }
};

const modifyReview = async (req, res, next) => {
    try {
        const { reviewId, userId } = req.params;
        const { matchedCount } = await Review.updateOne({ _id: reviewId, userId: userId }, req.body);

        if (matchedCount) {
            res.json({
                "links": {
                    "self": `/users/${userId}/reviews/${reviewId}`
                }
            });
        }
        else {
            next();
        }
    } catch (err) {
        res.status(400)
            .json({ "error": "Request did not contain a valid review object" });
    }
};

const deleteReview = async (req, res, next) => {
    const { reviewId, userId } = req.params;
    const { deletedCount } = await Review.deleteOne({ _id: reviewId, userId: userId });

    if (deletedCount > 0) {
        res.sendStatus(200);
    } else {
        next();
    }
};

module.exports = {
    createReview,
    getReview,
    getReviews,
    modifyReview,
    deleteReview
};