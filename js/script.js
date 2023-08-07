console.log(getWeather('강남구'));

function getWeather(msrstnName) {
    const apiKey = 'Ak9aORXhv2N8IxiN%2FVh%2BjKM7sDM3NVwmAwv9nTf9TJShIhimCh1dY7P%2FZqGHOdbnQSLF%2FsDUcgp3D6u0ISF%2ByQ%3D%3D';
    var date = getToday();
    fetch(`http://apis.data.go.kr/B552584/ArpltnStatsSvc/getMsrstnAcctoRDyrg?inqBginDt=${date}&inqEndDt=${date}&msrstnName=${msrstnName}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let res = data.response.body.items[0];
            //직렬화
            return weather = new Weather(
                res.so2Value,
                res.coValue,
                res.pm10Value,
                res.no2Value,
                res.o3Value,
                res.pm25Value
            );
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}
function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + (date.getDate()-1)).slice(-2);
    return year + month + day;
}

class Weather{
    constructor(so2Value, coValue, pm10Value, no2Value, o3Value, pm25Value){
        this.so2Value = so2Value;
        this.coValue = coValue;
        this.pm10Value = pm10Value;
        this.no2Value = no2Value;
        this.o3Value = o3Value;
        this.pm25Value = pm25Value;
    }
}