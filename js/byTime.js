let total_data = {
    "PM10" : {
        "informOverall" : "asdf",
        "informCause" : "cause",
    }
};

let list = ['PM10', 'PM25', 'O3', 'NO2', 'CO', 'SO2'];
let btn_list = document.getElementsByClassName('item_btn');

// init();
function init(){
    for(var i=0;i<list.length;i++){
        // getWeather(list[i]);
    }
    console.log("init");
    showData("PM10");
}

function showData(itemCode){
    console.log(itemCode);
    for(var i=0;i<list.length;i++){
        btn_list[i].style.borderColor = 'grey';
        btn_list[i].style.color = 'grey';
    }

    document.getElementById("inform")
        .innerHTML = "예보정보" 
            + total_data[itemCode]["informOverall"]
            + total_data[itemCode]["informCause"];
    
}

function getWeather(itemCode) {
    const apiKey = 'Ak9aORXhv2N8IxiN%2FVh%2BjKM7sDM3NVwmAwv9nTf9TJShIhimCh1dY7P%2FZqGHOdbnQSLF%2FsDUcgp3D6u0ISF%2ByQ%3D%3D';
    var date = getToday();
    fetch(`http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth?serviceKey=${apiKey}&returnType=json&numOfRows=1&pageNo=1&searchDate=${date}&informCode=${itemCode}`)
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