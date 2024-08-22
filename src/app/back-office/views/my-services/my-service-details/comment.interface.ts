export interface Comment {
    _id?: string;
    rating: number;
    text: string;
    userId?: string;
    raterUserId?: string;
    serviceId?: string;
    created_at?: string;
    updated_at?: string;
}