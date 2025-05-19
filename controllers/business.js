const { Business } = require("../models/business");
const { paginate } = require("../lib/utils");

const pageSize = 10;

const createBusiness = async (req, res) => {
    try {
        const business = new Business(req.body);
        await business.save();

        res.status(201)
            .send({
                "id": business.id,
                "links": {
                    "self": `/businesses/${business.id}`
                }
            });
    } catch (err) {
        res.status(400)
            .json({ "error": "Request did not contain a valid business object" });
    }
};

const getBusinesses = async (req, res, next) => {
    const page = parseInt(req.query.page || 1);

    const businesses = await Business.find({});
    const pagedBusinesses = paginate(businesses, page, pageSize);

    if (pagedBusinesses.length > 0) {
        res.json(pagedBusinesses);
    } else {
        next();
    }
};

const getBusiness = async (req, res, next) => {
    const business = await Business.findById(req.params.businessId)
        .populate("reviews")
        .populate("photos")
        .exec();

    if (business) {
        res.json(business);
    } else {
        next();
    }
};

const getUserBusinesses = async (req, res, next) => {
    const page = parseInt(req.query.page || 1);

    const businesses = await Business.find({ userId: req.params.userId });
    const pagedBusinesses = paginate(businesses, page, pageSize);

    if (pagedBusinesses.length > 0) {
        res.json(pagedBusinesses);
    } else {
        next();
    }
};

const getUserBusiness = async (req, res, next) => {
    const { businessId, userId } = req.params;
    const business = await Business.findOne({ _id: businessId, userId: userId });

    if (business) {
        res.json(business);
    } else {
        next();
    }
};

const modifyBusiness = async (req, res, next) => {
    try {
        const { businessId, userId } = req.params;
        const { matchedCount } = await Business.updateOne({ _id: businessId, userId: userId }, req.body);

        if (matchedCount > 0) {
            res.json({
                "links": {
                    "self": `/businesses/${businessId}`
                }
            });
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
        res.status(400)
            .json({ "error": "Request did not contain a valid business object" });
    }
};

const deleteBusiness = async (req, res, next) => {
    const { businessId, userId } = req.params;
    const { deletedCount } = await Business.deleteOne({ _id: businessId, userId: userId });

    if (deletedCount > 0) {
        res.sendStatus(200);
    } else {
        next();
    }
};

module.exports = {
    getBusiness,
    getBusinesses,
    getUserBusiness,
    getUserBusinesses,
    createBusiness,
    modifyBusiness,
    deleteBusiness,
}