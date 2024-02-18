import axios from 'axios'

const url = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => {
    const r = axios.get(url)
    return r.then(r => r.data)
}

export default {getAll}