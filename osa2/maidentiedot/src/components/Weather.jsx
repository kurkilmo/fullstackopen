import { useEffect, useState } from 'react'
import weatherService from '../services/weather'

const Weather = ({lat, lon}) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        weatherService.getWeather(lat, lon).then(resp => {
            setWeather(resp)
        })
    }, [lat,lon])
    if (weather === null) return <div>Weather unavailable</div>
    return (
        <div>
            temperature {weather.main.temp} Celsius <br/>
            <img 
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
                alt={weather.weather[0].description} 
            /> <br/>
            wind {weather.wind.speed} m/s
        </div>
    )
}

export default Weather