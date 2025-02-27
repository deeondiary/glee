import {axiosInstance} from "@/src/util/axios";

/**
 * MY > 템플릿 불러오기 (전체 조회)
 */
export const getUserTemplate = async () => {
    try {
        const response = axiosInstance.get('/suggester/user/me');
        return (await response).data;
    } catch (error) {
        console.log('error', error);
    }
}

/**
 * MY > 템플릿 불러오기 (상세 조회)
 */
export const getUserTemplateDetail = async (id: string) => {
    try {
        const response = axiosInstance.get(`/suggester/${id}`);
        return (await response).data;
    } catch (error) {
        console.log('error', error);
    }
}
