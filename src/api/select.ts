import {axiosInstance} from "@/src/util/axios";
import {UploadedImageArray} from "@/src/type/select";
import {TemplateGenerateParam, TemplateSaveParam} from "@/src/type/template"
/**
 * 이미지 업로드 & ai 분석 요청
 */
export const postUploadImage = async (img: UploadedImageArray, purpose: string | null) => {
    type ImageUploadData = {
        [key: string]: string | File | null;
    }
    const data: ImageUploadData = {purpose: purpose === 'reply' ? 'Response to photo' : 'Response with a similar vibe'}
    img.forEach((file, index) => {
        data[`image_file_${index + 1}`] = file.data;
    })

    const config = {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        url: '/suggester/analyze/image',
        data: data,
    }
    try {
        const response = axiosInstance.request(config);
        return (await response).data;
    } catch (error) {
        console.log('error', error);
    }
}

/**
 * ai 템플릿 작성 요청
 */
export const postGenerateTemplates = async (data: TemplateGenerateParam) => {
    try {
        const response = axiosInstance.post('/suggester/generate', data);
        return (await response).data;
    } catch (error) {
        console.log('error', error);
    }
}

/**
 * 선택한 ai 템플릿 저장
 */
export const postSaveTemplate = async (data: TemplateSaveParam) => {
    try {
        const response = axiosInstance.post('/suggester', data);
        return (await response).data;
    } catch (error) {
        console.log('error', error);
    }
}