import axios from 'axios'

const url = (lat, lon) => {
    const api = import.meta.env.VITE_W_KEY
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}&units=metric`
}

const getWeather = (lat, lon) => {
    const request = axios.get(url(lat, lon))
    return request.then(r => r.data)
}

export default {getWeather}