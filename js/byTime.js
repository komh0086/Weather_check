let total_data = {
};

let list = ['PM10', 'PM25', 'O3', 'NO2', 'CO', 'SO2'];
let btn_list = document.getElementsByClassName('item_btn');
let image = document.getElementById('image');
let img_index = 0;

let img_list = [
    'https://www.airkorea.or.kr/file/proxyImage?fileName=2023/08/13/AQFv1_21h.20230812.KNU_09_01.PM10.1hsp.2023081300.png',
    'https://www.airkorea.or.kr/file/proxyImage?fileName=2023/08/13/AQFv1_21h.20230812.KNU_09_01.PM10.1hsp.2023081306.png',
    'https://www.airkorea.or.kr/file/proxyImage?fileName=2023/08/13/AQFv1_21h.20230812.KNU_09_01.PM10.1hsp.2023081312.png',
    'https://www.airkorea.or.kr/file/proxyImage?fileName=2023/08/13/AQFv1_21h.20230812.KNU_09_01.PM2P5.1hsp.2023081312.png',
    'https://www.airkorea.or.kr/file/proxyImage?fileName=2023/08/13/AQFv1_21h.20230812.KNU_09_01.PM2P5.1hsp.2023081306.png',
    'https://www.airkorea.or.kr/file/proxyImage?fileName=2023/08/13/AQFv1_21h.20230812.KNU_09_01.PM2P5.1hsp.2023081300.png'
];

init();

function changeImage(){

    image.src = img_list[img_index%img_list.length];
    img_index++;
}
function init(){
    // for(var i=0;i<list.length;i++){
    //     getWeather(list[i]);
    // }
    getWeather("PM10");

    for(var i=0;i<list.length;i++){
        btn_list[i].addEventListener('click', (e) =>{
            showData(list[i]);
            e.target.style.color = 'blue';
            e.target.style.borderColor = 'blue';
        });
    }
    setInterval(changeImage, 1000);
}

function showData(itemCode){
    for(var i=0;i<list.length;i++){
        btn_list[i].style.borderColor = 'grey';
        btn_list[i].style.color = 'grey';
    }

    // document.getElementById("inform")
    //     .innerHTML = "예보정보" 
    //         + total_data[itemCode]["informOverall"]
    //         + total_data[itemCode]["informCause"];
    // document.getElementById("inform").innerHTML = itemCode;
    
}

function getWeather(itemCode) {
    const apiKey = 'Ak9aORXhv2N8IxiN%2FVh%2BjKM7sDM3NVwmAwv9nTf9TJShIhimCh1dY7P%2FZqGHOdbnQSLF%2FsDUcgp3D6u0ISF%2ByQ%3D%3D';
    var date = getToday();
    var url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${apiKey}&returnType=json&numOfRows=1&pageNo=1&searchDate=${date}&informCode=${itemCode}`;
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let res = data.response.body.items[0];
            total_data[itemCode] = res;
            
            })
        .catch(error => {
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