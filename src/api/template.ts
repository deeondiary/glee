import {axiosInstance} from "@/src/util/axios";

/**
 * MY 템플릿 불러오기
 */
export const getUserTemplate = async () => {
    try {
        const response = axiosInstance.get('/suggester/user/me');
        return (await response).data;
    } catch (error) {
        console.log('error', error);
    }
}