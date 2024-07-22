export interface Story {
    id: number;
    title: string;
    text: string;
    by: string;
    score: number;
    time: number;
    kids?: number[];
}
