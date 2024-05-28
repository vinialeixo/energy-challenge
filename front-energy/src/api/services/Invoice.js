import { makeRequest } from "../Api";

const invoice = '/invoice'

export const getClientNumbers = () => {

    return makeRequest.get(`${invoice}/client-numbers`)
        .then((response) => {
            return response
        })
}

export const getByClientNumber = (data) => {

    return makeRequest.get(`${invoice}/client-number`, data)
        .then((response) => {
            return response
            console.log(response)
        })
}

export const getDocument = (data) => {

    return makeRequest.get(`${invoice}/document`, data)
        .then((response) => {
            return response
        })
}

export const invoiceImport = (data) => {
    
    return makeRequest.post(`${invoice}/upload`, data, {
        "Content-Type": "multipart/form-data"
    }).then((response) => {
        return response
    })
}