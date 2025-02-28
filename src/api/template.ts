import {axiosInstance} from "@/src/util/axios";
import {TemplateTagEditParam} from "@/src/type/template";

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
        console.log('error', error);
    }
}

/**
 * MY > 템플릿 수정하기
 */
export const editUserTemplateDetail = async (data: TemplateTagEditParam) => {
    try {
        const response = axiosInstance.put(`/suggester/tag`, data);
        return (await response).data;
    } catch (error) {
        console.log('error', error);
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
        console.log('error', error);
    }
}