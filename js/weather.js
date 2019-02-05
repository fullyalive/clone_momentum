const weather = document.querySelector(".js-weather");
const locationInfo = document.querySelector(".js-location");

const COORDS = "coords";
const API_KEY = "272c07fa46ea481e3d7ae840c0fa027c";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      //json이 준비되면
      console.log(json);
      const temperature = Math.floor(json.main.temp);
      const place = json.name;
      const country = json.sys.country;
      const condition = json.weather[0].main;
      weather.innerText = `${condition}, ${temperature}°C`;
      locationInfo.innerText = `${country}, ${place}`;
    });
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  // 좌표 가지고 오는데 성공했을 경우를 처리하는 함수

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // latitude = latitude, longitude = longitude 와 같다.
    longitude
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("지역을 찾을 수 없습니다.");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    //   console.log(parsedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
