import {axiosInstance} from "@/src/util/axios";

export const postUploadImage = async (body: FormData | null) => {
    // const arr = []
    // body?.forEach((image) => {
    //     arr.push(image)
    // })
    console.log('body', body)
    const data = {
        purpose: 'Response to photo',
        image_files: body
    }
    console.log(data)
    const config = {
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        url: '/suggester/analyze/image',
        data: data,
    }
    try {
        const request = axiosInstance.request(config)

        // const response = await axiosInstance.post('/suggester/analyze/image', {
        //     headers: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        // }, data)
        console.log('rr', request)
        // return response.data;
    } catch (error) {
        console.log('error', error);
    }
}