let total_data = {
};
let list = ["PM10", "PM25", "O3"];
let btn_list = document.getElementsByClassName('item_btn');
let image = document.getElementById('image');
let img_index = 0;

let img_url = 
    'https://www.airkorea.or.kr/file/proxyImage?fileName=2023/08/15/AQFv1_09h.20230815.KNU_09_01.PM10.2days.ani.gif'
;

init();

function init(){
    for(var i=0;i<list.length;i++){
        getWeather(list[i]);
    }

    btn_list[0].addEventListener('click', (e) =>{
        showData("PM10");
        e.target.style.color = 'blue';
        e.target.style.borderColor = 'blue';
    });

    btn_list[1].addEventListener('click', (e) =>{
        showData("PM25");
        e.target.style.color = 'blue';
        e.target.style.borderColor = 'blue';
    });

    btn_list[2].addEventListener('click', (e) =>{
        showData("O3");
        e.target.style.color = 'blue';
        e.target.style.borderColor = 'blue';
    });
}

function showData(itemCode){
    for(var i=0;i<list.length;i++){
        btn_list[i].style.borderColor = 'grey';
        btn_list[i].style.color = 'grey';
    }

    var regions = [
        "busan", "chungbuk", "chungnam", "daegu", "daejeon",
        "gyeonggibukbu", "gwangju", "gyeongbuk", "youngdong", "gyeongnam",
        "incheon", "jeju", "jeonbuk", "jeonnam", "sejong", "seoul", "ulsan"
    ];
    var regions_korean = [
        "부산", "충북", "충남", "대구", "대전", "경기북부", "광주", "경북", "영동", "경남",
        "인천", "제주", "전북", "전남", "세종", "서울", "울산"
    ];

    var informGrade_list = {};
    informGrade_list = total_data['PM10'].informGrade.replaceAll(" : ", ",").split(",");
    
    for(var i=0;i<informGrade_list.length;i+=2){
        for(var j=0;j<regions_korean.length;j++){
            if(regions_korean[j] == informGrade_list[i]){
                var div = document.getElementById(regions[j]);
                div.innerHTML = regions_korean[j] + " : " + informGrade_list[i+1];
                if(informGrade_list[i+1]=='좋음'){
                    div.style.borderColor = 'blue';
                }else if(informGrade_list[i+1] == '보통'){
                    div.style.borderColor = 'orange';
                }else{
                    div.style.borderColor = 'red';
                }
                break;
            }
        }
    }
    var image = document.getElementById("image");
    if(itemCode == "PM10")
        image.src = total_data['PM10'].imageUrl7;
    else if(itemCode == "PM25")
        image.src = total_data['PM25'].imageUrl8;
    else
        image.src = total_data['O3'].imageUrl9;

    document.getElementById("Overall").innerHTML = total_data[itemCode].informOverall;
    document.getElementById("Cause").innerHTML = total_data[itemCode].informCause;

}

function getWeather(itemCode) {
    const apiKey = 'Ak9aORXhv2N8IxiN%2FVh%2BjKM7sDM3NVwmAwv9nTf9TJShIhimCh1dY7P%2FZqGHOdbnQSLF%2FsDUcgp3D6u0ISF%2ByQ%3D%3D';
    var date = getToday();
    var url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${apiKey}&returnType=json&numOfRows=1&pageNo=1&searchDate=${date}&informCode=${itemCode}&ver=1.1`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let res = data.response.body.items[0];
            total_data[itemCode] = res;
            })
        .catch(error  => {
            console.error(error);
        });
}

function getToday(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + (date.getDate())).slice(-2);
    return year + "-" + month + "-" + day;
}