const COORDS = "coords";

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
  }
}

function init() {
  loadCoords();
}

init();
