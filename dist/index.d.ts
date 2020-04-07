import { PhotoMap } from "./model/photo.interface";
import { CloudinaryCredentials } from "./model/cloudinary-credentials.interface";
export default class CloudinaryMetadataApi {
    private readonly credentials;
    constructor(credentials: CloudinaryCredentials);
    /**
     * Gets all photo data.
     * Gets all tags, and then gets all photo data per tag.
     */
    getAllPhotoData(): Promise<PhotoMap>;
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
