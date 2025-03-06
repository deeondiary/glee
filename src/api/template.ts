import {axiosInstance} from "@/src/util/axios";
import {TemplateWriteParam} from "@/src/type/template";

/**
 * MY > 템플릿 불러오기 (전체 조회)
 */
export const getUserTemplate = async () => {
    try {
        const response = axiosInstance.get('/suggester/user/me');
        return (await response).data;
    } catch (error) {
        throw error;
    }
    // const config = {method: "get", url: "/suggester/user/me"}
    // const onFail = (code: string) => { modal.openModal(code) };
    // await axios.request({config, onFail})
    //     .then((res) => {
    //         console.log(res)
    //     })
}

/**
 * MY > 템플릿 불러오기 (상세 조회)
 */
export const getUserTemplateDetail = async (id: string) => {
    try {
        const response = axiosInstance.get(`/suggester/${id}`);
        return (await response).data;
    } catch (error) {
        throw error;
    }
}

/**
 * MY > 템플릿 생성하기
 */
export const writeUserTemplateDetail = async (data: TemplateWriteParam) => {
    try {
        const response = axiosInstance.post(`/suggester`, data);
        return (await response).data;
    } catch (error) {
        throw error;
    }
}

/**
 * MY > 템플릿 수정하기
 */
export const editUserTemplateDetail = async (id: string, data: TemplateWriteParam) => {
    try {
        const response = axiosInstance.put(`/suggester/${id}`, data);
        return (await response).data;
    } catch (error) {
        throw error;
    }
}

/**
 * MY > 템플릿 삭제하기
 */
export const deleteUserTemplateDetail = async (id: string) => {
    try {
        const response = axiosInstance.delete(`/suggester/${id}`);
        return (await response).data;
    } catch (error) {
        throw error;
    }
}

/**
 * MY > 템플릿 검색하기
 */
export const getUserTemplateSearch = async (query: string) => {
    try {
        const response = axiosInstance.get(`/suggester/search?query=${query}`);
        return (await response).data;
    } catch (error) {
        throw error;
    }
}
/**
 * 추천 > 템플릿 검색하기
 */
export const getRecommendedTemplateSearch = async (query: string) => {
    try {
        const response = axiosInstance.get(`/suggester/recommend?query=${query}`);
        return (await response).data;
    } catch (error) {
        throw error;
    }
}

/**
 * 대화내역 불러오기 (history)
 */
export const getUserSuggestionHistory = async () => {
    try {
        const response = axiosInstance.get(`/history`);
        return (await response).data;
    } catch (error) {
        throw error;
    }
}

/**
 * 추천 템플릿 불러오기
 */
export const getUserRecommendedTemplates = async () => {
    try {
        const response = axiosInstance.get(`/suggester/recommend`);
        return (await response).data;
    } catch (error) {
        throw error;
    }
}