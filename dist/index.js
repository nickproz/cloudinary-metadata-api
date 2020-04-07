"use strict";
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
        while (_) try {
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var constants = __importStar(require("./constants"));
var NodeCache = require("node-cache");
var CloudinaryCacheAPI = /** @class */ (function () {
    function CloudinaryCacheAPI(cloudinaryApiKey, cloudinaryApiSecret, cloudinaryCloudName, cacheTimeToLiveSeconds) {
        if (cacheTimeToLiveSeconds === void 0) { cacheTimeToLiveSeconds = constants.CACHE_TIME_TO_LIVE_SECONDS; }
        this.cloudinaryApiKey = cloudinaryApiKey;
        this.cloudinaryApiSecret = cloudinaryApiSecret;
        this.cloudinaryCloudName = cloudinaryCloudName;
        this.cacheTimeToLiveSeconds = cacheTimeToLiveSeconds;
        this.cloudinaryCache = new NodeCache({ stdTTL: cacheTimeToLiveSeconds, checkperiod: cacheTimeToLiveSeconds / 10 });
    }
    /**
     * Clears the cache for the API.
     */
    CloudinaryCacheAPI.prototype.clearCache = function () {
        return this.cloudinaryCache.flushAll();
    };
    /**
     * Gets all photo data.
     * Gets all tags, and then gets all photo data per tag.
     */
    CloudinaryCacheAPI.prototype.getAllPhotoData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var photoData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        photoData = this.cloudinaryCache.get(constants.CACHE_KEY_PHOTO_DATA);
                        if (!!photoData) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.fetchAllPhotoData()];
                    case 1:
                        // Fetch all photo data for each tag and concatenate them
                        photoData = _a.sent();
                        // Save our photo data to the cache
                        this.cloudinaryCache.set(constants.CACHE_KEY_PHOTO_DATA, photoData);
                        _a.label = 2;
                    case 2: return [2 /*return*/, photoData];
                }
            });
        });
    };
    /**
     * Fetches all photo data from Cloudinary.
     */
    CloudinaryCacheAPI.prototype.fetchAllPhotoData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var tags;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchAllTags()];
                    case 1:
                        tags = _a.sent();
                        // Fetch all photo data for each tag and concatenate them
                        return [2 /*return*/, Promise.all(tags.map(function (tag) { return _this.fetchPhotoDataByTag(tag); }))
                                .then(function (data) { return Object.assign.apply(Object, __spreadArrays([{}], data)); })];
                }
            });
        });
    };
    /**
     * Fetches all tags.
     */
    CloudinaryCacheAPI.prototype.fetchAllTags = function () {
        return axios_1.default.get(this.generateGetAllTagsUrl()).then(function (_a) {
            var tags = _a.data.tags;
            return tags;
        });
    };
    /**
     * Fetches all photo data for the given tag.
     * Returns it in a new map of tag -> photo data.
     */
    CloudinaryCacheAPI.prototype.fetchPhotoDataByTag = function (tagName) {
        return __awaiter(this, void 0, void 0, function () {
            var resources;
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get(this.generateGetPhotoDataForTagUrl(tagName))];
                    case 1:
                        resources = (_b.sent()).data.resources;
                        return [2 /*return*/, (_a = {},
                                _a[tagName] = resources
                                    .filter(function (photo) { return !!photo; })
                                    // Sort our photos based on their public ID
                                    .sort(function (a, b) { return a.public_id.localeCompare(b.public_id); })
                                    .map(function (photo) { return _this.transformPhotoData(photo); }),
                                _a)];
                }
            });
        });
    };
    /**
     * Transforms our photo data.
     * Converts thumbnail URL & photo URLs.
     */
    CloudinaryCacheAPI.prototype.transformPhotoData = function (photo) {
        return {
            thumbnailUrl: this.generateThumbnailUrl(photo.public_id),
            photoUrl: this.generatePhotoUrl(photo.public_id)
        };
    };
    CloudinaryCacheAPI.prototype.generateBaseUrl = function () {
        return "https://" + this.cloudinaryApiKey + ":" + this.cloudinaryApiSecret + "@api.cloudinary.com/v1_1/" + this.cloudinaryCloudName;
    };
    CloudinaryCacheAPI.prototype.generatePhotoUrl = function (publicId) {
        return "https://res.cloudinary.com/" + this.cloudinaryCloudName + "/image/upload/" + constants.CLOUDINARY_TRANSFORM_AUTO_FORMAT + "/" + publicId;
    };
    CloudinaryCacheAPI.prototype.generateThumbnailUrl = function (publicId) {
        return "https://res.cloudinary.com/" + this.cloudinaryCloudName + "/image/upload/" + constants.CLOUDINARY_TRANSFORM_THUMBNAIL + "," + constants.CLOUDINARY_TRANSFORM_AUTO_FORMAT + "/" + publicId;
    };
    CloudinaryCacheAPI.prototype.generateGetAllTagsUrl = function () {
        return "" + this.generateBaseUrl() + constants.URI_GET_ALL_TAGS + "?" + constants.PARAMETER_MAX_RESULTS;
    };
    CloudinaryCacheAPI.prototype.generateGetPhotoDataForTagUrl = function (tagName) {
        return "" + this.generateBaseUrl() + constants.URI_GET_PHOTO_DATA_FOR_TAG + "/" + tagName + "?" + constants.PARAMETER_MAX_RESULTS;
    };
    return CloudinaryCacheAPI;
}());
exports.default = CloudinaryCacheAPI;
