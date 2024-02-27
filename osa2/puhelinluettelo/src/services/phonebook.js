import axios from 'axios'
const url = '/api/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then(r => r.data)
}
  
const add = newObject => {
  const request = axios.post(url, newObject)
  return request.then(r => r.data)
}

const remove = id => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(r => r.data)
}

const update = (id, newPerson) => {
  const req = axios.put(`${url}/${id}`, newPerson)
  return req.then(r => r.data)
}

export default {getAll, add, remove, update}