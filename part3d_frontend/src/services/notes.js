import axios from 'axios';

const baseUrl = '/api/notes';

let token = null;

const setToken = newToken => {
    token = `Bearer ${newToken}`;
}

const getAll = async () => {
    const request = axios.get(baseUrl);
    return request.then(res => res.data);
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token }
    }
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(res => res.data);
}

//Since the names of the keys and the assigned variables are the same, we can write the object definition with a more compact syntax (ES6 feature):
export default { getAll, create, update, setToken };