import axios from 'axios';
import base64 from "base-64";

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

const logout = () => {
    localStorage.clear();
    window.location.href = window.location.origin + '/login';
}

const baseApiCall = async attrs => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');

    console.log(email)
    console.log(password)
    
    headers['Authorization'] = `Basic ${base64.encode('admin@gmail.com' + ":" + 'Password12')}`;

    const axiosInstance = axios.create({
        headers,
    });

    return axiosInstance;
};

const apiCall = async (url, httpMethod, body, additionalParams) => {
    const axiosInstance = await baseApiCall();
    switch (httpMethod) {
        case 'post':
        case 'put':
        case 'patch':
            return axiosInstance[httpMethod](url, body, additionalParams);
        case 'get':
            return axiosInstance[httpMethod](url, body);
        case 'delete':
            return axiosInstance[httpMethod](url);
        default:
            return axiosInstance[httpMethod](url);
    }
};

const apiRequest = async (url, httpMethod, body = {}, additionalParams = {}) => {
    return new Promise(function (resolve, reject) {
        apiCall(url, httpMethod, body, additionalParams)
            .then(response => {
                if (response.data.status === 401) {
                    logout();
                    return
                }
                if (response.status < 400) {
                    if (response.data.status >= 400) {
                        // not really success so we reject
                        reject(response.data);
                    } else {
                        // not an error so respond
                        resolve(response.data);
                    }
                } else {
                    // we reject for now
                    reject(response.data);
                }
            })
            .catch(err => {
                if (axios.isCancel(err)) {
                    console.log('Request canceled', err);
                }
                // console.log(err.request)
                if (err.message) {
                    // store.dispatch(showToast(err.message, 'error'))
                }
                console.log(err.response)
                if (err.response) {
                    if (err.response.status === 401) {
                        // logout
                        console.log("A message from api.js: It should logout at this point.");
                    }
                    reject(err);
                }
                reject(err);
            });
    });
};

export { apiRequest };

