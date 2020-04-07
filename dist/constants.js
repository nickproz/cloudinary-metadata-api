"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// URI/URL fragments
exports.URI_GET_ALL_TAGS = '/tags/image';
exports.URI_GET_PHOTO_DATA_FOR_TAG = '/resources/image/tags';
exports.PARAMETER_MAX_RESULTS = 'max_results=500';
// Cloudinary transforms
exports.CLOUDINARY_TRANSFORM_THUMBNAIL = 't_gallery-thumbnail';
exports.CLOUDINARY_TRANSFORM_AUTO_FORMAT = 'f_auto';
// Cache
exports.CACHE_KEY_PHOTO_DATA = "photoData";
exports.CACHE_TIME_TO_LIVE_SECONDS = 60 * 60; // 1 hour
