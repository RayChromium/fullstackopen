import axios from 'axios';

const baseUrl = '/api/notes';

const getAll = () => {
    return axios.get(baseUrl)
                .then(res => res.data);
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
                .then(res => res.data);
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
                .then(res => res.data);
}

//Since the names of the keys and the assigned variables are the same, we can write the object definition with a more compact syntax (ES6 feature):
export default { getAll, create, update };