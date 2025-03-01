import {axiosInstance} from "@/src/util/axios";

export const loginKaKao = () => {
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;
    window.location.href = link;
}

export const getKakaoProfile = async (code: string) => {
    try {
        const response = await axiosInstance.get(`/kakao/callback?code=${code}`)
        return response.data;
    } catch (error) {
        console.log('error', error);
    }
}