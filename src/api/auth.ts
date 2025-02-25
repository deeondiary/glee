import {axiosInstance} from "@/src/util/axios";
import {KaKaoProfile} from "@/src/type/auth";
import {AxiosResponse} from "axios";

export const getKakaoProfile = async (code: string) => {
    try {
        const response = await axiosInstance.get(`/kakao/callback?code=${code}`)
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}