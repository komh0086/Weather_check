var btn_list = document.getElementsByClassName('item_btn');

var list = ["PM10", "PM25", "O3", "NO2", "CO", "SO2"];
for(var i=0;i<btn_list.length;i++){
    btn_list[i].addEventListener('click', getWeather(list[i]));
}   

function getWeather(itemCode) {

    var btn_list = document.getElementsByClassName('item_btn');
    
    var list = ["PM10", "PM25", "O3", "NO2", "CO", "SO2"];
    for(var i=0;i<list.length;i++){
        if(list[i] == itemCode){
            btn_list[i].style.borderColor = 'blue';
            btn_list[i].style.color = 'blue';
        }else{
            btn_list[i].style.borderColor = 'grey';
            btn_list[i].style.color = 'grey';
        }
        
    }

    const apiKey = 'Ak9aORXhv2N8IxiN%2FVh%2BjKM7sDM3NVwmAwv9nTf9TJShIhimCh1dY7P%2FZqGHOdbnQSLF%2FsDUcgp3D6u0ISF%2ByQ%3D%3D';
    var date = getToday();
    fetch(`http://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureLIst?serviceKey=${apiKey}&returnType=json&numOfRows=1&pageNo=1&itemCode=${itemCode}&dataGubun=HOUR`)
        .then(response => response.json())
        .then(data => {
            let res = data.response.body.items[0];
            var busan = document.getElementById('busan');
            var chungbuk = document.getElementById('chungbuk');
            var chungnam = document.getElementById('chungnam');
            var daegu = document.getElementById('daegu');
            var daejeon = document.getElementById('daejeon');
            var gangwon = document.getElementById('gangwon');
            var gwangju = document.getElementById('gwangju');
            var gyeongbuk = document.getElementById('gyeongbuk');
            var gyeonggi = document.getElementById('gyeonggi');
            var gyeongnam = document.getElementById('gyeongnam');
            var incheon = document.getElementById('incheon');
            var jeju = document.getElementById('jeju');
            var jeonbuk = document.getElementById('jeonbuk');
            var jeonnam = document.getElementById('jeonnam');
            var sejong = document.getElementById('sejong');
            var seoul = document.getElementById('seoul');
            var ulsan = document.getElementById('ulsan');

            busan.innerHTML = "부산 " + res['busan'];
            busan.removeAttribute("class");
            busan.setAttribute("class", statusLevel(res['busan'], itemCode));

            chungbuk.innerHTML = "충북 " + res['chungbuk'];
            chungbuk.removeAttribute("class");
            chungbuk.setAttribute("class", statusLevel(res['chungbuk'], itemCode));

            chungnam.innerHTML = "충남 " + res['chungnam'];
            chungnam.removeAttribute("class");
            chungnam.setAttribute("class", statusLevel(res['chungnam'], itemCode));

            daegu.innerHTML = "대구 " + res['daegu'];
            daegu.removeAttribute("class");
            daegu.setAttribute("class", statusLevel(res['daegu'], itemCode));

            daejeon.innerHTML = "대전 " + res['daejeon'];
            daejeon.removeAttribute("class");
            daejeon.setAttribute("class", statusLevel(res['daejeon'], itemCode));

            gangwon.innerHTML = "강원 " + res['gangwon'];
            gangwon.removeAttribute("class");
            gangwon.setAttribute("class", statusLevel(res['gangwon'], itemCode));

            gwangju.innerHTML = "광주 " + res['gwangju'];
            gwangju.removeAttribute("class");
            gwangju.setAttribute("class", statusLevel(res['gwangju'], itemCode));

            gyeongbuk.innerHTML = "경북 " + res['gyeongbuk'];
            gyeongbuk.removeAttribute("class");
            gyeongbuk.setAttribute("class", statusLevel(res['gyeongbuk'], itemCode));

            gyeonggi.innerHTML = "경기 " + res['gyeonggi'];
            gyeonggi.removeAttribute("class");
            gyeonggi.setAttribute("class", statusLevel(res['gyeonggi'], itemCode));

            gyeongnam.innerHTML = "경남 " + res['gyeongnam'];
            gyeongnam.removeAttribute("class");
            gyeongnam.setAttribute("class", statusLevel(res['gyeongnam'], itemCode));

            incheon.innerHTML = "인천 " + res['incheon'];
            incheon.removeAttribute("class");
            incheon.setAttribute("class", statusLevel(res['incheon'], itemCode));

            jeju.innerHTML = "제주 " + res['jeju'];
            jeju.removeAttribute("class");
            jeju.setAttribute("class", statusLevel(res['jeju'], itemCode));

            jeonbuk.innerHTML = "전북 " + res['jeonbuk'];
            jeonbuk.removeAttribute("class");
            jeonbuk.setAttribute("class", statusLevel(res['jeonbuk'], itemCode));

            jeonnam.innerHTML = "전남 " + res['jeonnam'];
            jeonnam.removeAttribute("class");
            jeonnam.setAttribute("class", statusLevel(res['jeonnam'], itemCode));

            sejong.innerHTML = "세종 " + res['sejong'];
            sejong.removeAttribute("class");
            sejong.setAttribute("class", statusLevel(res['sejong'], itemCode));

            seoul.innerHTML = "서울 " + res['seoul'];
            seoul.removeAttribute("class");
            seoul.setAttribute("class", statusLevel(res['seoul'], itemCode));

            ulsan.innerHTML = "울산 " + res['ulsan'];
            ulsan.removeAttribute("class");
            ulsan.setAttribute("class", statusLevel(res['ulsan'], itemCode));
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