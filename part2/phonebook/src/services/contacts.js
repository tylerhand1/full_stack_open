import axios from 'axios'
const baseURL = `/api/persons`

const getAll = () => {
    const request = axios.get(baseURL)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseURL, newObject)
    console.log(`From contacts.js`, newObject)
    return request.then(response => response.data)
}

const remove = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseURL}/${id}`, newObject)
    return request.then(response => response.data)
}

export default {getAll, create, remove, update}