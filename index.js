import * as env from 'dotenv'
env.config()

async function getLocation() {
    const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Kuala+Lumpur&limit=5&appid=${process.env.API_KEY}`)
    const result = await data.json()
    return [result[0].lat, result[0].lon]
}


async function fetchWeather() {
    const [lat, lon] = await getLocation()
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.API_KEY}`)
    const result = await data.json()
    console.log(result.main.temp)
}


fetchWeather()