export interface UploadedImage {
    name: string;
    url: string;
    data: File | null;
}
export type UploadedImageArray = Array<UploadedImage>;

export interface ImageAnalyzeResult {
    purpose: string;
    situation: string;
    tone: string;
    usage: string;
    detail: string;
}