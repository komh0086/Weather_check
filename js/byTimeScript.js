

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