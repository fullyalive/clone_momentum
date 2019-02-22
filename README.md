# **clone_momentum**

Cloning momentum with Vanilla JS

## Structure

[flag-icon-css](http://flag-icon-css.lip.is/) - 전세계 국기 icon css

### **clock.js**

- 현재 시간 표시

```
function getTime() {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}
```

```
setInterval(getTime, 1000);
```

### **weather.js**

- openweathermap.org로부터 api를 받아와 localStorage에 저장
- 날씨와 온도, 국가와 도시 출력
- 날씨에 따라 아이콘 출력, 국가에 따라 국기 출력

```
fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
```

```
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
```

```
function printWeather(condition) {
  let weatherTitle = "";
  let weatherClass = "";

  if (condition === "Rain") {
    (weatherTitle = "비"), (weatherClass = "fas fa-cloud-rain");
  } else if (condition === "Clear") {
    (weatherTitle = "화창"), (weatherClass = "far fa-sun");
  } else if (condition === "Thunderstorm") {
    (weatherTitle = "천둥번개"), (weatherClass = "fas fa-bolt");
  } else if (condition === "Clouds") {
    (weatherTitle = "구름"), (weatherClass = "fas fa-cloud");
  } else if (condition === "Snow") {
    (weatherTitle = "눈"), (weatherClass = "far fa-snowflake");
  } else if (condition === "Drizzle") {
    (weatherTitle = "이슬비"), (weatherClass = "fas fa-umbrella");
  } else if (condition === "Haze") {
    (weatherTitle = "안개"), (weatherClass = "fas fa-cloud-meatball");
  } else if (condition === "Mist") {
    (weatherTitle = "안개"), (weatherClass = "fab fa-cloudsmith");
  } else {
    (weatherTitle = "적당한 날씨"), (weatherClass = "fas fa-feather-alt");
  }
  const className = weatherClass.split(" ");
  weatherIcon = icon.classList.add(...className);
  weatherName = weather.innerText = `${weatherTitle}`;
}
```

### **greeting.js**

- 유저로부터 네임을 입력받아 localStorage에 저장
- 유저네임을 업데이트
- clock.js에서 받아온 시간에 따라 인사말 다르게 출력

```
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = greetingInput.value;
  paintGreeting(); // 인사말 출력
  paintUsername(currentValue); // 유저 네임 출력
  saveName(currentValue); // 유저 네임을 로컬 스토리지에 저장
}
```

```
function paintGreeting() {
  const date = new Date();
  const time = date.getHours();
  let greetingWord = "";

  if (time < 7) {
    greetingWord = "Good day";
  } else if (time < 10) {
    greetingWord = "Good morning";
  } else if (time < 18) {
    greetingWord = "Good afternoon";
  } else {
    greetingWord = "Good evening";
  }
  greetingForm.classList.remove(SHOWING_CN);
  greetingWords.classList.add(SHOWING_CN);
  greetingWords.innerText = `${greetingWord},`;
}
```

### **focus.js**

- 유저로부터 목표를 입력받아 localStorage에 저장
- 목표를 업데이트

```
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = focusInput.value;
  paintFocus(currentValue);
  saveFocus(currentValue);
}
```

### **todo.js**

- 할 일 등록(최신순으로 정렬)
- 할 일 수정
- 할 일 삭제
- 할 일이 없을 경우 박스 접기

```
function handleSubmit(event) {
  event.preventDefault();
  const selector = event.target;
  let currentValue = "";
  if (selector.className === "js-toDoForm") {
    currentValue = toDoInput.value;
    toDoInput.value = ""; 
    paintToDo(currentValue);
  } else {
    currentValue = selector.lastChild.value;
    selector.classList.remove("clicked"); 
    selector.previousSibling.classList.remove("removed"); 
    selector.previousSibling.innerHTML = `${currentValue}`; 
    toDos[selector.parentNode.id - 1].text = `${currentValue}`;
    saveToDos();
  }
}
```

### **background.js**

- 배경 이미지 랜덤 출력

```
const IMG_NUMBER = 6;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.appendChild(image)
}

function genRandom() {
  // 랜덤 넘버 생성
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}
```
