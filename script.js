const apiKey = "ef2a351d2e616d1bea92a6bcc37b28b1";

async function getWeather() {

    const city = document.getElementById("city").value.trim(); 

    const loading = document.getElementById("loading");
    const weather = document.getElementById("weather");
    const error = document.getElementById("error");

    loading.innerHTML = "Loading...";
    error.innerHTML = "";
    weather.style.display = "none";

    if(city===""){
        loading.innerHTML="";
        error.innerHTML="Please enter a city name";
        return;
    }

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try{

        const response=await fetch(url);

        if(!response.ok){
            throw new Error("City not found");
        }

        const data=await response.json();

        loading.innerHTML="";

        weather.style.display="block";

        document.getElementById("cityName").innerHTML=
            data.name+", "+data.sys.country;

        document.getElementById("temperature").innerHTML=
            "🌡 Temperature : "+data.main.temp+" °C";

        document.getElementById("description").innerHTML=
            "☁ Weather : "+data.weather[0].description;

        document.getElementById("humidity").innerHTML=
            "💧 Humidity : "+data.main.humidity+" %";

        document.getElementById("wind").innerHTML=
            "🌬 Wind Speed : "+data.wind.speed+" m/s";

        document.getElementById("icon").src=
            "https://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png";

    }

    catch(err){

        loading.innerHTML="";
        weather.style.display="none";
        error.innerHTML="City not found";

    }

}
