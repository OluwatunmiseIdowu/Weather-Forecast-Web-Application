function fetchWeather() {
  const cityInput = document.getElementById('city-input');
  const cityName = cityInput.value;
  const apiKey = '2af0ade375df1f5427afa7025a54aa1a';

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&APPID=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        document.getElementById('weather-info').textContent = 'No city found';
        document.getElementById('temperature-info').textContent = '';
      } else {
        const weather = data.weather[0].main;
        const temperature = Math.round(data.main.temp);
        document.getElementById('weather-info').textContent = `The weather in ${cityName} is: ${weather}`;
        document.getElementById('temperature-info').textContent = `The temperature in ${cityName} is: ${temperature}°F`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('weather-info').textContent = 'An error occurred while fetching the weather data.';
      document.getElementById('temperature-info').textContent = '';
    });
}
