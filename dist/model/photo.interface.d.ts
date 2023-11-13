export type Photo = string;
export interface PhotoMap {
    [key: string]: Photo[] | PhotoMap;
}
