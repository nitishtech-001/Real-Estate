import Listening from "../models/listening.model.js";
import { errorHandler } from "../utils/error.js";
import mongoose, { isValidObjectId } from "mongoose";
export const createListening = async (req, res, next) => {
    try {
        const listening = await Listening.create(req.body);
        res.status(201).json({
            message: "Listining created successfully!",
            listening
        });
    } catch (error) {
        next(error);
    }
}
export const deleteImageUrlListening = async (req, res, next) => {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        return next(errorHandler(400, "Listing ID was incorrect! try again"));
    }
    const listing = await Listening.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing does not exist"));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only Delete your own Listings!"));
    }
    try {
        if (listing.imageUrls.length === 1) {
            await Listening.findByIdAndDelete(req.params.id);
            res.status(200).json({});
        } else {
            listing.imageUrls.splice(req.body.deleteIndex, 1);
            await Listening.findByIdAndUpdate(req.params.id, listing);
            res.status(200).json(listing);
        }
    } catch (error) {
        next(error);
    }
}
export const deleteListening = async (req, res, next) => {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        return next(errorHandler(400, "Listing ID was incorrect! try again"));
    }
    const listing = await Listening.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listing does not exist"));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, "You can only Delete your own Listings!"));
    }
    try {
        await Listening.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Listing deleted successfully!" });
    } catch (error) {
        next(error);
    }
}
export const updateListening = async (req, res, next) => {
    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        return next(errorHandler(400, "Listing ID was incorrect! try again"));
    }
    const listing = await Listening.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listening not found!"));
    }
    if (listing.userRef != req.user.id) {
        return next(errorHandler(401, "You can only update your own listings!"));
    }
    try {
        const updatedListing = await Listening.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
}
export const getListening = async (req, res, next) => {

    const isValidObjectId = mongoose.Types.ObjectId.isValid(req.params.id);
    if (!isValidObjectId) {
        return next(errorHandler(400, "Listing ID was incorrect! try again"));
    }
    const listing = await Listening.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, "Listinig not found!"));
    }
    res.status(200).json(listing);
}
export const getListenings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        let offer = req.query.offer;
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] };
        }

        let parking = req.query.parking;
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] };
        }

        let furnished = req.query.furnished;
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false, true] };
        }

        let type = req.query.type;
        if (type === undefined || type === 'all' || type === 'false') {
            type = { $in: ['rent', 'sale'] };
        }

        const searchTerm = req.query.searchTerm || '';

        const sort = req.query.sort || 'createdAt';

        const order = req.query.order || 'desc';

        const listenings = await Listening.find({
            name: { $regex: searchTerm, $options: 'i' },
            offer,
            parking,
            furnished,
            type
        })
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex)
            .exec();
        res.status(200).json(listenings);

    } catch (error) {
        next(error);
    }
}