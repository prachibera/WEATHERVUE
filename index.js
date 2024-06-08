window.addEventListener('load', (event) => {
    navigator.geolocation.getCurrentPosition((success) => {

        let { latitude, longitude } = success.coords;

        showWeatherData(latitude, longitude)

    })
});


async function getWeather() {

    let city = document.querySelector("#city").value

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=132dfe6b546a8bafd0d4e3beb73597c9`).then(res => res.json()).then(data => {

        showWeatherData(data[0].lat, data[0].lon)
        document.querySelector("#search_city").innerText = data[0].name
        let map = document.querySelector("#gmap_canvas")
        map.src = `https://maps.google.com/maps?q=${data[0].name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
    })
}


async function showWeatherData(latitude, longitude) {
    try {
        let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=132dfe6b546a8bafd0d4e3beb73597c9`)
        let data = await res.json();
        console.log(data)
        appenddata(data)
    } catch (err) {
        console.log(err)
    }
}


function appenddata(data) {
    document.querySelector("#sevenday").innerHTML = ""
    data.daily.forEach(function (elem) {
        child_div = document.createElement("div");
        p1 = document.createElement("p")
        p1.innerText = window.moment(elem.dt * 1000).format('dddd')
        img = document.createElement("img")
        img.src = `http://openweathermap.org/img/wn/${elem.weather[0].icon}.png`
        p2 = document.createElement("p")
        p2.innerText = elem.weather[0].main
        p3 = document.createElement("p")
        p3.innerText = elem.temp.max + "°C"
        child_div.append(p1, img, p2, p3)
        document.querySelector("#sevenday").append(child_div)
    })

    document.querySelector("#s_temp").innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}.png" alt="" id="temp_icon">
            <p>${data.current.weather[0].main}</p>
        </div>
        <p id="temp">${data.current.temp}°C</p>
    `

    document.querySelector("#result").innerHTML = `
        <div>
            <img src="https://i.ibb.co/kc7wFb7/icons8-windsock-100.png" alt="">
            <p id="s_wind">${data.current.wind_speed} m/s</p>
        </div>
        <div>
            <img src="https://i.ibb.co/MSp35q2/icons8-pressure-gauge-96.png" alt="">
            <p id="s_presure">${data.current.pressure} hPa</p>
        </div>
        <div>
            <img src="https://i.ibb.co/nqpMSWP/icons8-humidity-64.png"" alt="">
            <p id="s_hum">${data.current.humidity}%</p>
        </div>
        <div>
            <img src="https://i.ibb.co/VHySJ06/icons8-sunlight-96.png" alt="">
            <p id="s_uv">${data.current.uvi}</p>
        </div>
        <div>
            <img src="https://i.ibb.co/vCNtYjc/icons8-dew-point-64.png" alt="">
            <p id="s_dew">${data.current.dew_point}°C</p>
        </div>
        <div>
            <img src="https://i.ibb.co/HLZY714/icons8-eye-100.png" alt="">
            <p id="s_vis">${(data.current.visibility) / 1000}km</p>
        </div>`




}

setInterval(() => {
    const timeEl = document.getElementById('time');
    const dateEl = document.getElementById('date');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();

    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = (days[day] + ', ' + date + ' ' + months[month])

}, 1000);