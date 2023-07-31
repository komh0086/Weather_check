function getWeather(itemCode) {
    const apiKey = 'Ak9aORXhv2N8IxiN%2FVh%2BjKM7sDM3NVwmAwv9nTf9TJShIhimCh1dY7P%2FZqGHOdbnQSLF%2FsDUcgp3D6u0ISF%2ByQ%3D%3D';
    const city = document.getElementById('cityInput').value;

    fetch(`http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?serviceKey=${apiKey}&returnType=json&numOfRows=30&pageNo=1&itemCode=${itemCode}&dataGubun=HOUR&searchCondition=WEEK`)
        .then(response => response.json())
        .then(data => {
            const weatherDataDiv = document.getElementById('weatherData');

            if (data.cod === 200) {
                const weatherDescription = data.weather[0].description;
                const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius

                weatherDataDiv.innerHTML = `Weather: ${weatherDescription}<br>Temperature: ${temperature}°C`;
            } else {
                weatherDataDiv.innerHTML = 'City not found. Please try again.';
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
