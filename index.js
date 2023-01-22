// import env from '/dotenv'
// // const env = require('dotenv')
// env.config()

import API_KEY from "./hide/api.js"

const printWeather = document.querySelector('.weather')
const printTemp = document.querySelector('.temperature')
const searchBar = document.querySelector('#searchbar')

async function getLocation() {
    const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=Sungai+Siput&limit=5&appid=${API_KEY}`)
    const result = await data.json()
    return [result[0].lat, result[0].lon]
}

async function fetchWeather() {
    const [lat, lon] = await getLocation()
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=2637a4df1d01664d70473ea8500bc53f`)
    const result = await data.json()
    console.log(result)
    // console.log(result.weather[0].main)
    // console.log(result.main.temp)
    printWeather.textContent = result.weather[0].main 
    printTemp.textContent = Math.floor(result.main.temp)
}

fetchWeather()
searchCity()