export enum WriteupType {
    Document = 'document',
    Video = 'video',
    YouTube = 'youtube'
}

export interface Writeup {
    id: string;
    user_id: string;
    link: string;
    filename: string;
    type: string;
}
