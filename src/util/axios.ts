import axios from "axios";

let token: string | null = '';

if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken');
}
export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'User-Type': 'ADMIN'
    }
});
axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

// axiosInstance.interceptors.request.use(async (config) => {
//     store.dispatch(startLoading())
//     return config
// }, (error) => {
//     store.dispatch(finishLoading())
//     return Promise.reject(error)
// })
//
// axiosInstance.interceptors.response.use((response) => {
//     store.dispatch(finishLoading())
//     return response
// }, (error) => {
//     store.dispatch(finishLoading())
//     if (error.response.data.status === 401) {
//         if (window.location.pathname === '/') {
//             store.dispatch(openPopup('계정정보를 확인해주세요.'))
//         } else {
//             store.dispatch(openPopup('세션이 만료되었습니다.\r\n 로그아웃 후 다시 로그인 해주세요.'))
//         }
//     } else if (error.response.data.status === 500) {
//         store.dispatch(openPopup('서버 점검중입니다.\r\n 잠시 후 다시 시도해주세요.'))
//     } else if (error.response.data.status !== 400) {
//         store.dispatch(openPopup('시스템 에러가 발생했습니다.\r\n  잠시 후 다시 시도해주세요.\r\n 같은 현상이 반복되면 관리자에게 문의해주세요.'))
//     }
//     return Promise.reject(error)
// })