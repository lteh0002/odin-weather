// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

// const API_KEY = process.env.API_KEY

// import { format, compareAsc } from 'date-fns'
import API_KEY from "./hide/api.js"

const weather = document.querySelector('#weather')
const city = document.querySelector('#city-name')
const temperature = document.querySelector('#temperature')
const feelsLike = document.querySelector('#feels-like')
const wind = document.querySelector('#wind')
const humidity = document.querySelector('#humidity')
const background = document.querySelector('#bg')

// const todayDate = format(new Date(), 'dd/MMM/yyyy')

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

  background.src = 'weather.avif'
  weather.textContent = result.weather[0].main
  city.textContent = result.name
  temperature.textContent = Math.round(result.main.temp) + '°'
  feelsLike.textContent = 'Feels Like: ' + result.main.feels_like + '°'
  wind.textContent = 'Wind Speed: ' + result.wind.speed + ' km/h'
  humidity.textContent = 'Humidity: ' + result.main.humidity + ' %'
}

fetchWeather()