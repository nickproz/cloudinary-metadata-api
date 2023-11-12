"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryMetadataApi = void 0;
var axios_1 = __importDefault(require("axios"));
var constants = __importStar(require("./model/const"));
var CloudinaryMetadataApi = /** @class */ (function () {
    function CloudinaryMetadataApi(credentials) {
        this.credentials = credentials;
    }
    /**
     * Gets all photo data.
     * Gets all tags, and then gets all photo data per tag.
     */
    CloudinaryMetadataApi.prototype.getAllPhotoData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tags, photoDataMap;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchAllTags()];
                    case 1:
                        tags = _a.sent();
                        return [4 /*yield*/, Promise.all(tags.map(function (tag) { return _this.fetchPhotoDataByTag(tag); })).then(function (data) {
                                return Object.assign.apply(Object, __spreadArray([{}], data, false));
                            })];
                    case 2:
                        photoDataMap = _a.sent();
                        // Unwrap any folder paths into nested objects
                        return [2 /*return*/, this.convertPhotoMapToPhotoMapWithNestedFolders(photoDataMap)];
                }
            });
        });
    };
    CloudinaryMetadataApi.prototype.getFolderSegmentsFromFolderPath = function (folderPath) {
        return folderPath.split('/').filter(function (segment) { return !!segment; });
    };
    CloudinaryMetadataApi.prototype.createFolderObjectInPhotoMap = function (folderSegments, photoDataMap, photos) {
        return folderSegments.reduce(function (updatedPhotoMap, folderSegment, index) {
            if (index >= folderSegments.length - 1) {
                // On last folder segment, set equal to photo array passed in
                updatedPhotoMap[folderSegment] = photos;
            }
            else {
                // Otherwise, create a new nested object if one doesn't already exist
                updatedPhotoMap[folderSegment] = updatedPhotoMap[folderSegment] || {};
            }
            return updatedPhotoMap[folderSegment];
        }, photoDataMap);
    };
    CloudinaryMetadataApi.prototype.convertPhotoMapToPhotoMapWithNestedFolders = function (photoDataMap) {
        var _this = this;
        return Object.entries(photoDataMap).reduce(function (newPhotoDataMap, _a) {
            var folderPath = _a[0], photos = _a[1];
            var folderSegments = _this.getFolderSegmentsFromFolderPath(folderPath);
            _this.createFolderObjectInPhotoMap(folderSegments, newPhotoDataMap, photos);
            return newPhotoDataMap;
        }, {});
    };
    /**
     * Fetches all tags.
     */
    CloudinaryMetadataApi.prototype.fetchAllTags = function () {
        return axios_1.default.get(this.generateGetAllTagsUrl()).then(function (_a) {
            var tags = _a.data.tags;
            return tags;
        });
    };
    /**
     * Fetches all photo data for the given tag.
     * Returns it in a new map of tag -> photo data.
     */
    CloudinaryMetadataApi.prototype.fetchPhotoDataByTag = function (tagName) {
        return __awaiter(this, void 0, void 0, function () {
            var resources, photos;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(this.generateGetPhotoDataForTagUrl(tagName))];
                    case 1:
                        resources = (_b.sent()).data.resources;
                        photos = resources
                            .filter(function (photo) { return !!photo; })
                            .map(function (photo) { return _this.transformPhotoData(photo); })
                            // Sort naturally
                            .sort(function (a, b) { return a.thumbnailUrl.localeCompare(b.thumbnailUrl, undefined, { numeric: true, sensitivity: 'base' }); });
                        return [2 /*return*/, (_a = {},
                                _a[tagName] = photos,
                                _a)];
                }
            });
        });
    };
    /**
     * Transforms our photo data.
     * Converts thumbnail URL & photo URLs.
     */
    CloudinaryMetadataApi.prototype.transformPhotoData = function (photo) {
        return {
            thumbnailUrl: this.generateThumbnailUrl(photo.public_id),
            photoUrl: this.generatePhotoUrl(photo.public_id),
        };
    };
    CloudinaryMetadataApi.prototype.generateBaseUrl = function () {
        return "https://".concat(this.credentials.cloudinaryApiKey, ":").concat(this.credentials.cloudinaryApiSecret, "@api.cloudinary.com/v1_1/").concat(this.credentials.cloudinaryCloudName);
    };
    CloudinaryMetadataApi.prototype.generatePhotoUrl = function (publicId) {
        return "https://res.cloudinary.com/".concat(this.credentials.cloudinaryCloudName, "/image/upload/").concat(constants.CLOUDINARY_TRANSFORM_AUTO_FORMAT, "/").concat(publicId);
    };
    CloudinaryMetadataApi.prototype.generateThumbnailUrl = function (publicId) {
        return "https://res.cloudinary.com/".concat(this.credentials.cloudinaryCloudName, "/image/upload/").concat(constants.CLOUDINARY_TRANSFORM_THUMBNAIL, ",").concat(constants.CLOUDINARY_TRANSFORM_AUTO_FORMAT, "/").concat(publicId);
    };
    CloudinaryMetadataApi.prototype.generateGetAllTagsUrl = function () {
        return "".concat(this.generateBaseUrl()).concat(constants.URI_GET_ALL_TAGS, "?").concat(constants.PARAMETER_MAX_RESULTS);
    };
    CloudinaryMetadataApi.prototype.generateGetPhotoDataForTagUrl = function (tagName) {
        return "".concat(this.generateBaseUrl()).concat(constants.URI_GET_PHOTO_DATA_FOR_TAG, "/").concat(tagName, "?").concat(constants.PARAMETER_MAX_RESULTS);
    };
    return CloudinaryMetadataApi;
}());
exports.CloudinaryMetadataApi = CloudinaryMetadataApi;
