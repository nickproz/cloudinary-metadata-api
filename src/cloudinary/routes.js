const cloudinary = require('./index');

// Route parameter variables
const API_PREFIX_CLOUDINARY = 'cloudinary';
const URI_GET_ALL_PHOTO_DATA = 'photos';
const URI_CLEAR_CACHE = 'clear-cache';

/**
 * Routes for our Cloudinary API.
 *
 * @param app - the express app to add the routes to
 */
module.exports = (app) => {

    /**
     * Gets information about all worksheets.
     */
    app.get(`/${API_PREFIX_CLOUDINARY}/${URI_GET_ALL_PHOTO_DATA}`, (req, res) => {
        cloudinary.getAllPhotoData(res);
    });

    /**
     * Gets information about all worksheets.
     */
    app.get(`/${API_PREFIX_CLOUDINARY}/${URI_CLEAR_CACHE}`, (req, res) => {
        cloudinary.clearCache(res);
    });
};