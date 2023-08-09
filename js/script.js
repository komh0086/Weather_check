init();



function init(){
    getWeather('노원구');

    var input = document.getElementById("search");
    input.setAttribute("placeholder", "원하는 지역 검색(강남구)");
    input.addEventListener('keypress', (e)=>{
        if(e.code == "NumpadEnter" || e.code == "Enter"){
            getWeather(e.currentTarget.value);
        }
    });
}

function getWeather(msrstnName) {
    const apiKey = 'Ak9aORXhv2N8IxiN%2FVh%2BjKM7sDM3NVwmAwv9nTf9TJShIhimCh1dY7P%2FZqGHOdbnQSLF%2FsDUcgp3D6u0ISF%2ByQ%3D%3D';
    var date = getToday();
    fetch(`http://apis.data.go.kr/B552584/ArpltnStatsSvc/getMsrstnAcctoRDyrg?inqBginDt=${date}&inqEndDt=${date}&msrstnName=${msrstnName}&pageNo=1&numOfRows=100&returnType=json&serviceKey=${apiKey}`)
        .then(response => response.json())
        .then(data => {
    
            let res = data.response.body.items[0];
            var pm10 = document.getElementById("pm10");
            var title = document.getElementById("pm10Title");
            document.getElementById("title").innerText = res.msrstnName;
            title.innerHTML = "미세먼지";
            title.setAttribute("class", statusLevel(res.pm10Value, "pm10"));
            var value = document.getElementById("pm10Value");
            value.innerHTML = res.pm10Value + "㎍/㎥";
            value.setAttribute("class", "value");
            pm10.append(title);
            pm10.append(value);

            var pm25 = document.getElementById("pm25");
            var title = document.getElementById("pm25Title");
            title.innerHTML = "초미세먼지";
            title.setAttribute("class", statusLevel(res.pm25Value, "pm25"));
            var value = document.getElementById("pm25Value");
            value.innerHTML = res.pm25Value + "㎍/㎥";
            value.setAttribute("class", "value");
            pm25.append(title);
            pm25.append(value);

            var o3 = document.getElementById("o3");
            var title = document.getElementById("o3Title");
            title.innerHTML = "오존";
            title.setAttribute("class", statusLevel(res.o3Value, "o3"));
            var value = document.getElementById("o3Value");
            value.innerHTML = res.o3Value + "ppm";
            value.setAttribute("class", "value");
            o3.append(title);
            o3.append(value);

            var no2 = document.getElementById("no2");
            var title = document.getElementById("no2Title");
            title.innerHTML = "이산화질소";
            title.setAttribute("class", statusLevel(res.no2Value, "no2"));
            var value = document.getElementById("no2Value");
            value.innerHTML = res.no2Value + "ppm";
            value.setAttribute("class", "value");
            no2.append(title);
            no2.append(value);

            var co = document.getElementById("co");
            var title = document.getElementById("coTitle");
            title.innerHTML = "일산화탄소";
            title.setAttribute("class", statusLevel(res.coValue, "co"));
            var value = document.getElementById("coValue");
            value.innerHTML = res.coValue + "ppm";
            value.setAttribute("class", "value");
            co.append(title);
            co.append(value);

            var so2 = document.getElementById("so2");
            var title = document.getElementById("so2Title");
            title.innerHTML = "아황산가스";
            title.setAttribute("class", statusLevel(res.so2Value, "so2"));
            var value = document.getElementById("so2Value");
            value.innerHTML = res.so2Value + "ppm";
            value.setAttribute("class", "value");
            so2.append(title);
            so2.append(value);
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

function statusLevel(value, type){
    if(type == "pm10"){
        if(value<=30){
            return "perfect";
        }else if(value<=60){
            return "good";
        }else if(value<=90){
            return "mid";
        }else if(value<=120){
            return "bad";
        }else{
            return "worst";
        }
    }else if(type == "pm25"){
        if(value<=15){
            return "perfect";
        }else if(value<=30){
            return "good";
        }else if(value<=45){
            return "mid";
        }else if(value<=60){
            return "bad";
        }else{
            return "worst";
        }
    }else if(type == "o3"){
        if(value<=0.04){
            return "perfect";
        }else if(value<=0.10){
            return "good";
        }else if(value<=0.18){
            return "mid";
        }else if(value<=0.30){
            return "bad";
        }else{
            return "worst";
        }
    }else if(type == "no2"){
        if(value<=0.05){
            return "perfect";
        }else if(value<=0.1){
            return "good";
        }else if(value<=0.2){
            return "mid";
        }else if(value<=0.3){
            return "bad";
        }else{
            return "worst";
        }
    }else if(type == "co"){
        if(value<=2){
            return "perfect";
        }else if(value<=7){
            return "good";
        }else if(value<=12){
            return "mid";
        }else if(value<=20){
            return "bad";
        }else{
            return "worst";
        }
    }else if(type == "so2"){
        if(value<=0.03){
            return "perfect";
        }else if(value<=0.06){
            return "good";
        }else if(value<=0.1){
            return "mid";
        }else if(value<=0.14){
            return "bad";
        }else{
            return "worst";
        }
    }else{
        return "none";
    }
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
