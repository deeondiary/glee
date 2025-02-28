// import {axiosInstance} from "@/src/util/axios";
// import {UseModal} from "@/src/api/template";
// import {useBoundStore} from "@/src/store/stores";
// import {AxiosError, AxiosResponse} from "axios";
// import {useState} from "react";
//
//
// interface ConfigProps {
//     method: string;
//     url: string;
//     isImage?: boolean;
//     data?: never;
// }
// interface AxiosManageProps {
//     config: ConfigProps;
//     modal?: UseModal;
//     onSuccess?: () => void;
//     onFail?: (status: string) => void;
// }
// type RequestFn<T> = (params: T) => Promise<AxiosResponse>;
// const useAxiosManage = (requestFn: RequestFn<T>, params: T) => {
//     const [response, setResponse] = useState<AxiosResponse>();
//     const [error, setError] = useState<AxiosError>();
//     const [isLoading, setIsLoading] = useState(false);
//
//     const fetchData = async () => {
//         setResponse(undefined);
//         setError(undefined);
//         setIsLoading(true);
//         try {
//             const response = await requestFn(params);
//             setResponse(response);
//         } catch (error) {
//             setError(error as AxiosError);
//         }
//         setIsLoading(false);
//     };
//
//     const sendRequest = async () => {
//         fetchData();
//     };
//
//     return { response, error, isLoading, sendRequest };
//     // const store = useBoundStore();
//     // const request = async (props: AxiosManageProps) => {
//     //     const config = {
//     //         method: props.config.method,
//     //         headers: {
//     //             'Content-Type': props.config.isImage ? 'multipart/form-data' : 'application/json;charset=UTF-8',
//     //         },
//     //         url: props.config.url,
//     //         data: props.config.data,
//     //     }
//     //     let data;
//     //     try {
//     //         await axiosInstance.request(config)
//     //             .then((res) => {
//     //                 if (props.onSuccess) {
//     //                     props.onSuccess();
//     //                 }
//     //                 data = res;
//     //             })
//     //             .catch((err) => {
//     //                 if (err.response && err.response.status === 401) {
//     //                     store.resetAuth();
//     //                 }
//     //                 if (props.onFail) {
//     //                     props.onFail(err.response.status);
//     //                 }
//     //             })
//     //     } catch (e) {
//     //         console.error(e, 'error');
//     //     }
//     //     return data;
//     // }
//     // return {request};
// }
//
// export default useAxiosManage;