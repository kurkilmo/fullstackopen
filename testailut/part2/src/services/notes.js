import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteNote = (id) => {
  const r = axios.delete(`${baseUrl}/${id}`)
  return r.then(resp => resp.data)
}

const reset = () => {
    const data = [
        {
          "id": "1",
          "content": "HTML is easy",
          "important": false
        },
        {
          "id": "2",
          "content": "Browser can execute only JavaScript",
          "important": false
        },
        {
          "id": "3",
          "content": "GET and POST are the most important methods of HTTP protocol",
          "important": false
        }
    ]
    console.log(data)
    return axios.put(baseUrl, data)
}

export default { getAll, create, update, reset, deleteNote }