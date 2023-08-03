function getWeather(msrstnName) {
    const apiKey = 'Ak9aORXhv2N8IxiN%2FVh%2BjKM7sDM3NVwmAwv9nTf9TJShIhimCh1dY7P%2FZqGHOdbnQSLF%2FsDUcgp3D6u0ISF%2ByQ%3D%3D';
    const city = document.getElementById('cityInput').value;
    var date = getToday;

    fetch(`http://apis.data.go.kr/B552584/ArpltnStatsSvc/getMsrstnAcctoRDyrg?inqBginDt=${date}&inqEndDt=${date}&msrstnName=${msrstnName}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log("api 요청 성공");
            //직렬화
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });

    function getToday(){
        var date = new Date();
        var year = date.getFullYear();
        var month = ("0" + (1 + date.getMonth())).slice(-2);
        var day = ("0" + date.getDate()).slice(-2);

        return year + month + day;
    }
}
