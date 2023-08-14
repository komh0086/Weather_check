var total_data = {
   
};
let list = ['PM10', 'PM25', 'O3', 'NO2', 'CO', 'SO2'];
let btn_list = document.getElementsByClassName('item_btn');
init();

function init(){
    for(var i=0;i<list.length;i++){
        getWeather(list[i]);
    }
}

function showData(itemCode){
    console.log(itemCode);
    for(var i=0;i<list.length;i++){
        btn_list[i].style.borderColor = 'grey';
        btn_list[i].style.color = 'grey';
    }

    var regions = [
        "busan", "chungbuk", "chungnam", "daegu", "daejeon",
        "gangwon", "gwangju", "gyeongbuk", "gyeonggi", "gyeongnam",
        "incheon", "jeju", "jeonbuk", "jeonnam", "sejong", "seoul", "ulsan"
    ];
    var regions_korean = [
        "부산", "충북", "충남", "대구", "대전", "강원", "광주", "경북", "경기", "경남",
        "인천", "제주", "전북", "전남", "세종", "서울", "울산"
    ];
    
    for (var i = 0; i < regions.length; i++) {
        var regionCode = regions[i];
        var regionElement = document.getElementById(regionCode);
        var regionData = total_data[itemCode][regionCode];
    
        regionElement.innerHTML = regions_korean[i] + " " + regionData;
        regionElement.removeAttribute("class");
        regionElement.setAttribute("class", statusLevel(regionData, itemCode));
    }
    
}

function getWeather(itemCode) {

    const apiKey = 'Ak9aORXhv2N8IxiN%2FVh%2BjKM7sDM3NVwmAwv9nTf9TJShIhimCh1dY7P%2FZqGHOdbnQSLF%2FsDUcgp3D6u0ISF%2ByQ%3D%3D';
    var date = getToday();
    fetch(`http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?serviceKey=${apiKey}&returnType=json&numOfRows=1&pageNo=1&itemCode=${itemCode}&dataGubun=HOUR`)
        .then(response => response.json())
        .then(data => {
            let res = data.response.body.items[0];
            total_data[itemCode] = res;
            for(var i=0;i<list.length;i++){
                if(list[i] == itemCode){
                    btn_list[i].addEventListener('click', (e) =>{
                        showData(itemCode);
                        e.target.style.color = 'blue';
                        e.target.style.borderColor = 'blue';
                    });
                }
            }
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
        if(value<=15){
            return "value_perfect";
        }else if(value<=30){
            return "value_good";
        }else if(value<=40){
            return "value_mid";
        }else if(value<=50){
            return "value_bad";
        }else{
            return "value_worst";
        }
    }else if(type == "pm25"){
        if(value<=8){
            return "value_perfect";
        }else if(value<=15){
            return "value_good";
        }else if(value<=20){
            return "value_mid";
        }else if(value<=25){
            return "value_bad";
        }else{
            return "value_worst";
        }
    }else if(type == "o3"){
        if(value<=0.02){
            return "value_perfect";
        }else if(value<=0.03){
            return "value_good";
        }else if(value<=0.06){
            return "value_mid";
        }else if(value<=0.09){
            return "value_bad";
        }else{
            return "value_worst";
        }
    }else if(type == "no2"){
        if(value<=0.02){
            return "value_perfect";
        }else if(value<=0.03){
            return "value_good";
        }else if(value<=0.05){
            return "value_mid";
        }else if(value<=0.08){
            return "value_bad";
        }else{
            return "value_worst";
        }
    }else if(type == "co"){
        if(value<=0.02){
            return "value_perfect";
        }else if(value<=2){
            return "value_good";
        }else if(value<=5){
            return "value_mid";
        }else if(value<=10){
            return "value_bad";
        }else{
            return "value_worst";
        }
    }else if(type == "so2"){
        if(value<=0.01){
            return "value_perfect";
        }else if(value<=0.02){
            return "value_good";
        }else if(value<=0.04){
            return "value_mid";
        }else if(value<=0.07){
            return "value_bad";
        }else{
            return "value_worst";
        }
    }else{
        return "value_mid";
    }
}