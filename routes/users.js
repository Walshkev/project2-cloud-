const router = require('express').Router();

// Import only the needed functions from each controller
const {
    getBusiness,
    getBusinesses,
    createBusiness,
    modifyBusiness,
    deleteBusiness,
} = require('../controllers/business');

const {
    createReview,
    getReview,
    getReviews,
    modifyReview,
    deleteReview
} = require('../controllers/review');

const {
    createPhoto,
    getPhoto,
    getPhotos,
    modifyPhoto,
    deletePhoto
} = require('../controllers/photo');

const addUserId = (req, res, next) => {
    if (req.user) {
        req.body.userId = req.user._id;
    }
    next();
}

// reviews
router.get('/:userId/reviews', getReviews);
router.get('/:userId/reviews/:reviewId', getReview);
router.post('/:userId/reviews', addUserId, createReview);
router.put('/:userId/reviews/:reviewId', addUserId, modifyReview);
router.delete('/:userId/reviews/:reviewId', deleteReview);

// businesses
router.get('/:userId/businesses', getBusinesses);
router.get('/:userId/businesses/:businessId', getBusiness);
router.post('/:userId/businesses', addUserId, createBusiness);
router.put('/:userId/businesses/:businessId', addUserId, modifyBusiness);
router.delete('/:userId/businesses/:businessId', deleteBusiness);

// photos 
router.get('/:userId/photos', getPhotos);
router.get('/:userId/photos/:photoId', getPhoto);
router.post('/:userId/photos', addUserId, createPhoto);
router.put('/:userId/photos/:photoId', addUserId, modifyPhoto);
router.delete('/:userId/photos/:photoId', deletePhoto);

module.exports = router;