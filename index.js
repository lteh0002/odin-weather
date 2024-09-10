const API_KEY = '2637a4df1d01664d70473ea8500bc53f'

const weather = document.querySelector('#weather')
const city = document.querySelector('#city-name')
const temperature = document.querySelector('#temperature')
const feelsLike = document.querySelector('#feels-like')
const wind = document.querySelector('#wind')
const humidity = document.querySelector('#humidity')
const background = document.querySelector('#bg')
const sunrisedate = document.querySelector('.sunrisedate')
const sunsetdate = document.querySelector('.sunsetdate')
const sunrise = document.querySelector('.sunrisetime')
const sunset = document.querySelector('.sunsettime')

async function getLocation(city = 'kuala+lumpur') {
  try {
    const data = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`)
    const result = await data.json()
    return [result[0].lat, result[0].lon]
  } catch (error) {
      alert('Location not found')
  }
}

async function getWeather(lat, lon) {
  try {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`)
    return await data.json()
  } catch (error) { 
    alert('Cannot get weather data')
  }
}

function updateDisplay(data) {
  const { weather, name, main, wind, sys } = data;

  background.src = 'weather.avif'
  weather.textContent = weather[0].main
  city.textContent = name
  temperature.textContent = Math.round(main.temp) + '°'
  feelsLike.textContent = 'Feels Like: ' + Math.round(main.feels_like) + '°'
  wind.textContent = 'Wind Speed: ' + wind.speed + ' km/h'
  humidity.textContent = 'Humidity: ' + main.humidity + ' %'

  const sunrisetime = new Date(sys.sunrise * 1000)
  const sunsettime = new Date(sys.sunset * 1000)

  let sunrisemonth = sunrisetime.getMonth()
  let sunsetmonth = sunsettime.getMonth()

  let sunrisedatenum = sunrisetime.getDate()
  let sunsetdatenum = sunsettime.getDate()

  let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  let sunrisehour = sunrisetime.getHours()
  let sunsethour = sunsettime.getHours()

  if (sunsethour > 12) {
    sunsethour = sunsethour - 12
  }

  let sunrisemin = sunrisetime.getMinutes()
  let sunsetmin = sunsettime.getMinutes()

  sunrisedate.textContent = sunrisedatenum + ' ' + month[sunrisemonth]
  sunsetdate.textContent = sunrisedatenum + ' ' + month[sunrisemonth]

  sunrise.textContent = sunrisehour + ':' + sunrisemin + ' ' + "am"
  sunset.textContent = sunsethour + ':' + sunsetmin + ' ' + "pm"
}

async function fetchWeather() {
  const [lat, lon] = await getLocation()
  const result = await getWeather(lat, lon);
  updateDisplay(result)
}

fetchWeather()