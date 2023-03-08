import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
    return axios.get(baseUrl)
         .then( res => res.data );
}

const addNewEntry = (newPerson) => {
    return axios.post( baseUrl, newPerson )
                .then( res => res.data );
}

const deleteEntry = (id, person) => {
    return axios.delete( `${baseUrl}/${id}`, person )
                .then( res => res.data );
}

const updateEntry = (id, person) => {
    return axios.put( `${baseUrl}/${id}`, person )
                .then( res => res.data );
}

export default { getAll, addNewEntry, deleteEntry, updateEntry };