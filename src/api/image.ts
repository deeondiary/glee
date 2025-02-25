import {axiosInstance} from "@/src/util/axios";

export const postUploadImage = async (img) => {
    console.log('image uploaded ::: ', img)

    const formData = new FormData();
    const dataArr = [];
    let file1;
    const data = {
        purpose: 'Response to photo',
    }
    img.forEach((file, index) => {
        data[`image_file_${index+1}`] = file.data;
    })
    console.log(data, 'data!!');
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