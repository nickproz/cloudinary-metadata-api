import { PhotoMap } from "./model/photo.interface";
import { CloudinaryCredentials } from "./model/cloudinary-credentials.interface";
export default class CloudinaryCacheApi {
    private readonly credentials;
    private readonly cacheTimeToLiveSeconds;
    private readonly cloudinaryCache;
    constructor(credentials: CloudinaryCredentials, cacheTimeToLiveSeconds?: number);
    /**
     * Clears the cache for the API.
     */
    clearCache(): void;
    /**
     * Gets all photo data.
     * Gets all tags, and then gets all photo data per tag.
     */
    getAllPhotoData(): Promise<PhotoMap>;
    /**
     * Fetches all photo data from Cloudinary.
     */
    private fetchAllPhotoData;
    /**
     * Fetches all tags.
     */
    private fetchAllTags;
    /**
     * Fetches all photo data for the given tag.
     * Returns it in a new map of tag -> photo data.
     */
    private fetchPhotoDataByTag;
    /**
     * Transforms our photo data.
     * Converts thumbnail URL & photo URLs.
     */
    private transformPhotoData;
    private generateBaseUrl;
    private generatePhotoUrl;
    private generateThumbnailUrl;
    private generateGetAllTagsUrl;
    private generateGetPhotoDataForTagUrl;
}
