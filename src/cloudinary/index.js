const axios = require('axios');
const NodeCache = require( "node-cache" );

// Cloudinary transforms
const CLOUDINARY_TRANSFORM_THUMBNAIL = 't_gallery-thumbnail';
const CLOUDINARY_TRANSFORM_AUTO_FORMAT = 'f_auto';

// URI/URL fragments
const URL_BASE = `https://${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}@api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}`;
const URI_GET_ALL_TAGS = '/tags/image';
const URI_GET_PHOTO_DATA_FOR_TAG = '/resources/image/tags';
const PARAMETER_MAX_RESULTS = 'max_results=500';

// URLs
const URL_GET_ALL_TAGS = `${URL_BASE}${URI_GET_ALL_TAGS}?${PARAMETER_MAX_RESULTS}`;
const URL_GET_PHOTO_DATA_FOR_TAG = `${URL_BASE}${URI_GET_PHOTO_DATA_FOR_TAG}`;
const URL_PHOTO_THUMBNAIL = `http://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${CLOUDINARY_TRANSFORM_THUMBNAIL},${CLOUDINARY_TRANSFORM_AUTO_FORMAT}`;
const URL_PHOTO = `http://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${CLOUDINARY_TRANSFORM_AUTO_FORMAT}`;

// Messages
const ERROR_MESSAGE_INTERNAL_SERVER_ERROR = 'An internal server error occurred.';

// Cache
const CACHE_KEY_PHOTO_DATA = "photoData";
const CACHE_TIME_TO_LIVE_SECONDS = 60 * 60;     // 1 hour
const CACHE_CHECK_PERIOD_SECONDS = 60 * 10;     // 10 minutes

// Create our node cache
const myCache = new NodeCache({ stdTTL: CACHE_TIME_TO_LIVE_SECONDS, checkperiod: CACHE_CHECK_PERIOD_SECONDS });

/**
 * Refresh our cache when it gets evicted so there is no down time.
 */
myCache.on('del', (key) => {
   if(key === CACHE_KEY_PHOTO_DATA) {
       myCache.get(CACHE_KEY_PHOTO_DATA, module.exports.handleFetchPhotoDataFromCache);
   }
});

/**
 * API for interacting with Cloudinary.
 */
module.exports = {

    /**
     * Clears the cache for the API.
     *
     * @param res - response to send data to
     */
    clearCache: (res) => {
        myCache.flushAll();
        res.status(200).send('OK');
    },

    /**
     * Gets all photo data.
     * Gets all tags, and then gets all photo data per tag.
     *
     * @param res - response to send data to
     */
    getAllPhotoData: async (res) => {
        try {
            myCache.get(CACHE_KEY_PHOTO_DATA, async (err, value) => {

                // Fetch our photo data from cache
                const photoData = await module.exports.handleFetchPhotoDataFromCache(err, value);

                // Return the photo data
                res.status(200).json(photoData);
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({ status: 500, message: ERROR_MESSAGE_INTERNAL_SERVER_ERROR, type: 'Internal Server Error' });
        }
    },

    /**
     * Callback function for retrieving data from cache.
     * If the data was returned from cache, we just return that.
     * If the data was not returned from cache, we re-fetch it
     *
     * @param error - error returned from our cache handler
     * @param cacheValue - the cached value returned from our cache
     * @returns {Promise<*>} - promise holding our photo data (either cached value or newly fetched value)
     */
    handleFetchPhotoDataFromCache: async (error, cacheValue) => {
        let photoData = cacheValue;

        // If the cache didn't return anything, re-fetch it
        if(!photoData) {
            // Fetch all photo data for each tag and concatenate them
            photoData = await module.exports.fetchAllPhotoData();

            // Save our photo data to the cache
            myCache.set(CACHE_KEY_PHOTO_DATA, photoData);
        }

        return photoData;
    },

    /**
     * Fetches all photo data from Cloudinary.
     *
     * @returns object with all key/value pairs of photo data
     */
    fetchAllPhotoData: async () => {
        // Fetch all tags
        const tags = await module.exports.fetchAllTags();

        // Fetch all photo data for each tag and concatenate them
        return Promise.all(tags.map(tag => module.exports.fetchPhotoDataByTag(tag)))
            .then(data => Object.assign({}, ...data));
    },

    /**
     * Fetches all tags.
     *
     * @returns {Promise<*>} holding an array of tag data
     */
    fetchAllTags: async () => {
        const { data: { tags } } = await axios.get(URL_GET_ALL_TAGS);
        return tags;
    },

    /**
     * Fetches all photo data for the given tag.
     * Returns it in a new map of tag -> photo data
     *
     * @param tagName - the tag name to fetch photo data for
     * @returns {Promise<{}>} holding photo data
     */
    fetchPhotoDataByTag: async (tagName) => {
        const { data: { resources } } = await axios.get(`${URL_GET_PHOTO_DATA_FOR_TAG}/${tagName}?${PARAMETER_MAX_RESULTS}`);

        return {
            [tagName]: resources
            // Sort our photos based on their public ID
                .sort((a, b) => a.public_id.localeCompare(b.public_id))
                // Clean up each photo
                .map(photo => module.exports.cleanUpPhotoData(photo))
        };
    },

    /**
     * Cleans up our photo data.
     * Deletes unneeded keys.
     * Adds new URL keys.
     *
     * @param photo - the photo data to manipulate
     * @returns the new photo object
     */
    cleanUpPhotoData: (photo) => {
        if(photo) {
            // Add new URL properties
            photo.thumbnailUrl = `${URL_PHOTO_THUMBNAIL}/${photo.public_id}`;
            photo.photoUrl = `${URL_PHOTO}/${photo.public_id}`;

            // Delete unused properties
            delete photo.version;
            delete photo.resource_type;
            delete photo.type;
            delete photo.created_at;
            delete photo.bytes;
            delete photo.width;
            delete photo.height;
            delete photo.backup;
            delete photo.secure_url;
            delete photo.url;
            delete photo.format;
            delete photo.public_id;
        }

        return photo;
    }
};
