let city = "delhi";
let apikey = "35b2887901a20030bc8485b096561560";
let weatherIcon = document.querySelector(".img");
let temp = document.querySelector(".Cloudly");
let wind = document.querySelector(".wind");
let humidity = document.querySelector(".humidity");
let feels = document.querySelector(".feels");
let haze = document.querySelector(".haze");
const loco = document.querySelector(".location");
const cityname = document.querySelector(".cityname");
const countryIcon=document.querySelector(".countryicon")
function date() {
  const data = document.querySelector(".date");
  let d = new Date().toLocaleDateString();

  data.textContent = d;
}

date();

function gettime() {
  setInterval(() => {
    const times = document.querySelector(".time");
    let d = new Date().toLocaleTimeString(); // for now
    times.textContent = d;
  }, 1000);
}
gettime();

loco.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
});

function showPosition(position) {
  const userCoordinates = {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
  };

  sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));

  fetchUserWeatherInfo(userCoordinates);
}
async function fetchUserWeatherInfo(userCoordinates) {
  try {
    let d=userCoordinates
    const { lat, lon } = d;
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
    );
    let result = await response.json();
    dataset(result);
  } catch (error) {
    alert(error);
  }
}

 function dataset(weatherInfo) {
  cityname.innerHTML = weatherInfo?.name;
  weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
  temp.innerText = `${weatherInfo?.main?.temp} °C`;
  wind.innerText = `Wind Speed ${weatherInfo?.wind?.speed} m/s`;
  humidity.innerText = `Humidity ${weatherInfo?.main?.humidity} %`;
  feels.innerText = `Feels Like ${weatherInfo?.main?.feels_like} °C`;
  haze.innerText = `${weatherInfo?.weather?.[0]?.main}`;
   countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
}







