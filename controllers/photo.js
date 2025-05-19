const { Photo } = require("../models/photo");
const { Business } = require("../models/business");
const { paginate } = require("../lib/utils");

const pageSize = 10;

const createPhoto = async (req, res) => {
    try {
        const photo = new Photo(req.body)
        await photo.save();

        await Business.updateOne({ _id: photo.businessId }, { $push: { photos: photo.id } })

        res.status(201)
            .send({
                "id": photo.id,
                "links": {
                    "self": `/users/${photo.userId}/photos/${photo.id}`
                }
            });
    } catch (err) {
        res.status(400)
            .json({ "error": "Request did not contain a valid photo object" });
    }
};

const getPhotos = async (req, res, next) => {
    const page = parseInt(req.query.page || 1);

    const photos = await Photo.find({});
    const pagedPhotos = paginate(photos, page, pageSize);

    if (pagedPhotos.length > 0) {
        res.json(pagedPhotos);
    } else {
        next();
    }
};

const getPhoto = async (req, res, next) => {
    const photo = await Photo.findById(req.params.photoId).exec();

    if (photo) {
        res.json(photo);
    } else {
        next();
    }
};

const modifyPhoto = async (req, res, next) => {
    try {
        const { photoId, userId } = req.params;
        const { matchedCount } = await Photo.updateOne({ _id: photoId, userId: userId }, req.body);

        if (matchedCount > 0) {
            res.json({
                "links": {
                    "self": `/users/${userId}/photos/${photoId}`
                }
            });
        } else {
            next();
        }
    } catch (err) {
        res.status(400)
            .json({ "error": "Request did not contain a valid photo object" });
    }
};

const deletePhoto = async (req, res, next) => {
    const { photoId, userId } = req.params;
    const { deletedCount } = await Photo.deleteOne({ _id: photoId, userId: userId });

    if (deletedCount > 0) {
        res.sendStatus(200);
    } else {
        next();
    }
};

module.exports = {
    createPhoto,
    getPhoto,
    getPhotos,
    modifyPhoto,
    deletePhoto
};