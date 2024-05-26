import { makeRequest } from "../Api";

const urlCommon = '/invoice'

export const getClientNumbers = () => {

    return makeRequest.get(`/client-numbers`)
        .then((response) => {
            return response
        })
}

export const getByClientNumber = (data) => {

    return makeRequest.get(`/client-number`, data)
        .then((response) => {
            return response
            console.log(response)
        })
}

export const getDocument = (data) => {

    return makeRequest.get(`/document`, data)
        .then((response) => {
            return response
        })
}

export const invoiceImport = (data) => {
    
    return makeRequest.post(`/import`, data, {
        "Content-Type": "multipart/form-data"
    }).then((response) => {
        return response
    })
}