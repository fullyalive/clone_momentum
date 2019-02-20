# clone_momentum

Cloning momentum with Vanilla JS

## Structure

### **clock.js**

- 현재 시간 표시

```
setInterval(getTime, 1000);
```

### **weather.js**

- openweathermap.org로부터 api를 받아와 localStorage에 저장
- 날씨와 온도, 국과와 도시 출력

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

### **greeting.js**

- 유저로부터 네임을 입력받아 localStorage에 저장
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

### **todo.js**

### **background.js**
