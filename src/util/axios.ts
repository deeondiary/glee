import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";

let token: string | null = '';

if (typeof window !== 'undefined') {
    token = localStorage.getItem('accessToken');
}
export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
    }
});

const onRequest = (
    config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
    const { method, url } = config;
    console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);

    if (!token) {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmlja25hbWUiOiJcdWQxNGNcdWMyYTRcdWQyYjggXHVhY2M0XHVjODE1IiwiZXhwIjozNzc0MDQwOTE0NywiaWF0IjoxNzQwNDA5MTQ3fQ.pfiODLavQXRjKcPjTxDJ8pJKZZJseFLL_LAZlTU3kt4';
    }
    config.headers.Authorization = `bearer ${token}`;
    return config;
};
const onResponse = (res: AxiosResponse): AxiosResponse => {
    const { method, url } = res.config;
    const status = res.status;
    const { code, message } = res.data;
    if (status === 200) {
        console.log(
            `🛬 [API - RESPONSE] ${method?.toUpperCase()} ${url} | ${code} : ${message}`,
        );
    } else {
        console.log(
            `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | ${code} : ${message}`,
        );
    }
    return res;
};
const onError = (error: AxiosError | Error): Promise<AxiosError> => {
    if (axios.isAxiosError(error)) {
        const { method, url } = error.config as InternalAxiosRequestConfig;
        if (error.response) {
            const { statusCode, message } = error.response.data;
            console.log(
                `🚨 [API - ERROR] ${method?.toUpperCase()} ${url} | ${statusCode} : ${message}`,
            );
        }
    } else {
        console.log(`🚨 [API] | Error ${error.message}`);
    }
    return Promise.reject(error);
};

axiosInstance.interceptors.request.use(onRequest);
axiosInstance.interceptors.response.use(
    onResponse,
    onError,
);

// axiosInstance.interceptors.request.use(
//     response => {
//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );
