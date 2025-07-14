import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body);
        return res.status(201).json(listing);
    } catch (error) {
        next(error);
    }
};

export const deleteListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }

    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only delete your own listings!'));
    }

    try {
        await Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted!');
    } catch (error) {
        next(error);
    }
};

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401, 'You can only update your own listings!'));
    }

    try {
        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedListing);
    } catch (error) {
        next(error);
    }
};

export const getListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);
        if (!listing) {
            return next(errorHandler(404, 'Listing not found!'));
        }
        res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
};

export const getListings = async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startIndex = parseInt(req.query.startIndex) || 0;

        // Parse query parameters
        let offer = req.query.offer;
        let furnished = req.query.furnished;
        let parking = req.query.parking;
        let type = req.query.type;
        const searchTerm = req.query.searchTerm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order || 'desc';
        const minPrice = req.query.minPrice ? parseInt(req.query.minPrice) : undefined;
        const maxPrice = req.query.maxPrice ? parseInt(req.query.maxPrice) : undefined;

        // Set up filters
        const filters = {
            name: { $regex: searchTerm, $options: 'i' },
            offer: (offer === undefined || offer === 'false') ? { $in: [false, true] } : offer,
            furnished: (furnished === undefined || furnished === 'false') ? { $in: [false, true] } : furnished,
            parking: (parking === undefined || parking === 'false') ? { $in: [false, true] } : parking,
            type: (type === undefined || type === 'all') ? { $in: ['sale', 'rent'] } : type
        };

        // Add price range filter if applicable
        if (minPrice !== undefined || maxPrice !== undefined) {
            filters.regularPrice = {};
            if (minPrice !== undefined) filters.regularPrice.$gte = minPrice;
            if (maxPrice !== undefined) filters.regularPrice.$lte = maxPrice;
        }

        // Execute query
        const listings = await Listing.find(filters)
            .sort({ [sort]: order })
            .limit(limit)
            .skip(startIndex);

        return res.status(200).json(listings);
    } catch (error) {
        next(error);
    }
};