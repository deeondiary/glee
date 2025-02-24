import {axiosInstance} from "@/src/util/axios";
import {KaKaoProfile} from "@/src/type/auth";

export const getKakaoProfile: (param: string) => Promise<KaKaoProfile> = async (code) => {
    const response =
        await axiosInstance.get<KaKaoProfile>(`/kakao/callback?code=${code}`);
    return response.data;
}