import axios from "axios";

const getApiUrl = () => {
    return process.env.REACT_APP_API_URL
}

const defaultHeaders = {
}

const defaultGetHeaders = {
    ...defaultHeaders,
}
const defaultPostHeaders = {
    ...defaultHeaders,
}

const handleSuccess = (response) => {
    return response
}

const handleError = (error) => {
    return new Promise((resolve, reject) => {
        reject(error);
    })
}

export const makeRequest = {

    get: async (endpoint, params, additionalHeaders={}) => {
        const url = getApiUrl() + endpoint

        return axios.get(url, { 
            params,
            headers: {
                ...defaultGetHeaders,
                ...additionalHeaders,
            },
        })
        .then(handleSuccess)
        .catch(handleError)
    },
    post: async (endpoint, params, additionalHeaders={}) => {
        const url = getApiUrl() + endpoint

        return axios.post(url, params, {
            headers: {
                ...defaultPostHeaders,
                ...additionalHeaders
            }
        })
        .then(handleSuccess)
        .catch(handleError)
    }
}