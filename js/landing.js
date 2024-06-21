// DOM elements
const time = document.getElementById("time"),
  greeting = document.getElementById("greeting"),
  focus = document.getElementById("focus");

//options
const showAmPm = true;

function showTime() {
  // let today = new Date(2019, 6, 10, 20, 33, 30),
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // SET am pm
  const amPm = hour >= 12 ? "PM" : "AM";

  // 12時間制に変換 (hour = hour % 12 || 12)
  hour = hour % 12 || 12;

  // Add zeros
  hour = addZero(hour);
  min = addZero(min);
  sec = addZero(sec);

  // Output time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${sec} ${
    showAmPm ? amPm : ""
  }`;

  setTimeout(showTime, 1000);
}

// Add zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}

// Background and Greeting
function setBgGreet() {
  // let today = new Date(2019, 6, 10, 20, 33, 30),
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage = "url('../img/morning.jpeg')";
    greeting.textContent = "Good Morning";
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage = "url('../img/afternoon.jpeg')";
    greeting.textContent = "Good Afternoon";
  } else {
    // Evening
    document.body.style.backgroundImage = "url('../img/evening.jpeg')";
    greeting.textContent = "Good Evening";
    document.body.style.color = "white";
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Enter Focus]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === "keypress") {
    if (e.which == 13 || e.keyCode == 13) {
      //エンターキーを押したらフォーカスを外す
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
}

focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);

// Run
showTime();
setBgGreet();

getFocus();
