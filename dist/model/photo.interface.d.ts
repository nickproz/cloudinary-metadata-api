export interface Photo {
    photoUrl: string;
    thumbnailUrl: string;
}
export interface PhotoMap {
    [key: string]: Photo[] | PhotoMap;
}
