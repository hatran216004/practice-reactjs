import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reqres.in',
});

instance.interceptors.response.use(
    function (response) {
        return response.data
            ? response.data
            : {
                  statusCode: response.status,
              };
    },
    function (error) {
        let res = {};

        if (error.response) {
            res.data = error.response.data;
            res.status = error.response.status;
            res.headers = error.response.headers;
        } else if (error.request) {
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }

        return res;
    },
);

export default instance;
