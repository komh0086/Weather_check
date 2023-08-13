getWeather("PM10");



function getWeather(itemCode) {
    const apiKey = 'Ak9aORXhv2N8IxiN%2FVh%2BjKM7sDM3NVwmAwv9nTf9TJShIhimCh1dY7P%2FZqGHOdbnQSLF%2FsDUcgp3D6u0ISF%2ByQ%3D%3D';
    var date = getToday();
    fetch(`http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?serviceKey=${apiKey}&returnType=json&numOfRows=1&pageNo=1&itemCode=${itemCode}&dataGubun=HOUR`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
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