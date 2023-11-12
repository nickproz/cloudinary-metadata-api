export interface CloudinaryPhoto {
    public_id: string;
    format: string;
    version: number;
    resource_type: string;
    type: string;
    created_at: Date;
    bytes: number;
    width: string;
    height: string;
    backup: boolean;
    access_mode: string;
    url: string;
    secure_url: string;
}
