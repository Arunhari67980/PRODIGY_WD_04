document.addEventListener('DOMContentLoaded', () => {
    const fetchWeatherBtn = document.getElementById('fetchWeatherBtn');
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const apiKey = '38cbebb39a30d69a73664b0cd16c99fd'; // Your API key here

    fetchWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        }
    });

    function fetchWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        console.log('Fetching weather data for:', location); // Debug log

        fetch(url)
            .then(response => {
                console.log('API response status:', response.status); // Debug log
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message) });
                }
                return response.json();
            })
            .then(data => {
                console.log('Weather data:', data); // Debug log
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.innerHTML = `<p>Error fetching weather data: ${error.message}. Please try again.</p>`;
            });
    }

    function displayWeather(data) {
        const { name, main, weather, wind } = data;
        const weatherHTML = `
            <h2>Weather in ${name}</h2>
            <p>Temperature: ${main.temp}°C</p>
            <p>Condition: ${weather[0].description}</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
        `;
        weatherInfo.innerHTML = weatherHTML;
    }
});
