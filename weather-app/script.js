
form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.info("Saved " + city_list.value);
    fetchWeather(city_list.value);
});  

function saveData(response) {
    pressure.innerHTML = response.current.pressure_in
    wind_speed.innerHTML = response.current.wind_kph
    wind_degree.innerHTML = response.current.wind_degree
    wind_dir.innerHTML = response.current.wind_dir
    humidity.innerHTML = response.current.humidity
    precipitation.innerHTML = response.current.precip_in
    uv.innerHTML = response.current.uv
    temp_cur.innerHTML = response.current.temp_c
    feels_like.innerHTML = response.current.feelslike_c
    weather.innerHTML = response.current.condition.text
    loc.innerHTML = response.location.name
    temp_today.innerHTML = response.forecast.forecastday[0].day.avgtemp_c
    temp_min_today.innerHTML = response.forecast.forecastday[0].day.mintemp_c
    temp_max_today.innerHTML = response.forecast.forecastday[0].day.maxtemp_c
    temp_tom.innerHTML = response.forecast.forecastday[1].day.avgtemp_c
    temp_min_tom.innerHTML = response.forecast.forecastday[1].day.mintemp_c
    temp_max_tom.innerHTML = response.forecast.forecastday[1].day.maxtemp_c
    temp_after_tom.innerHTML = response.forecast.forecastday[2].day.avgtemp_c
    temp_min_after_tom.innerHTML = response.forecast.forecastday[2].day.mintemp_c
    temp_max_after_tom.innerHTML = response.forecast.forecastday[2].day.mintemp_c
}

function fetchWeather(cityName) {
    city = (cityName=="")?'Jodhpur':cityName
    console.log(city);
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '73479c8263msh7151a96153185e9p1788aajsn1d611c727f5c',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
};

    fetch(url, options)
    .then(response => response.json())
    .then(response => {
        console.log(response)
        saveData(response)
    })
    .catch(err => console.error(err));
}