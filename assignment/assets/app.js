// play piano
const playPiano = (keyCode) => {
  //console.log(keyCode);
  let key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!key) return;
  let audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
  audio.addEventListener("ended", () => {
    key.classList.remove("playing");
  });
};
// window keydown
window.addEventListener("keydown", (e) => {
  playPiano(e.keyCode);
});
// piano key click
const pianoKeyClick = (keyStr) => {
  let key = Number(keyStr.getAttribute("data-key"));
  playPiano(key);
};

// const removeTransition = (e) => {
//   if (e.propertyName !== "transform") return;
//   e.target.classList.remove("playing");
// };
// const keys = Array.from(document.querySelectorAll(".key"));
// keys.forEach((key) => key.addEventListener("transitionend", removeTransition));

// Returns a Promise that resolves after "ms" Milliseconds
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const digitalClock = async () => {
  // We need to wrap the loop into an async function for this to work
  for (var i = 0; i < Infinity; i++) {
    let date = new Date();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    // console.log(`${hour}:${minute}:${second}`)
    document.querySelector(".clock-hour").innerText =
      hour < 10 ? `0${hour}` : hour > 12 ? `0${hour - 12}` : hour;
    document.querySelector(".clock-minute").innerText =
      minute < 10 ? `0${minute}` : minute;
    document.querySelector(".clock-second").innerText =
      second < 10 ? `0${second}` : second;
    await timer(500); // then the created Promise can be awaited
  }
};
digitalClock();

const monthsName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const calculateAge = () => {
  const today = new Date();
  let datePicked = new Date(document.querySelector(".datetime").value);
  let birthDate, birthMonth, birthYear;

  let birthDetails = {
    date: datePicked.getDate(),
    month: datePicked.getMonth() + 1,
    year: datePicked.getFullYear(),
  };

  let currentDate = today.getDate();
  let currentMonth = today.getMonth() + 1;
  let currentYear = today.getFullYear();

  leapChecker(currentYear);

  if (
    birthDetails.year > currentYear ||
    (birthDetails.month > currentMonth && birthDetails.year === currentYear) ||
    (birthDetails.date > currentDate &&
      birthDetails.month === currentMonth &&
      birthDetails.year === currentYear)
  ) {
    document.querySelector(".calculator-result").innerText = "Enter correct age.";
    return;
  }

  birthYear = currentYear - birthDetails.year;

  if (currentMonth >= birthDetails.month) {
    birthMonth = currentMonth - birthDetails.month;
  } else {
    birthYear--;
    birthMonth = 12 + currentMonth - birthDetails.month;
  }

  if (currentDate >= birthDetails.date) {
    birthDate = currentDate - birthDetails.date;
  } else {
    birthMonth--;
    let days = months[currentMonth - 2];
    birthDate = days + currentDate - birthDetails.date;
    if (birthMonth > 0) {
      birthMonth = 11;
      birthYear--;
    }
  }

  document.querySelector(".calculator-result").innerText = `You are ${birthYear}years, ${birthMonth}months and ${birthDate}days old. 😂`;
  // console.log(birthYear, birthMonth, birthDate)
}

const leapChecker = (year) => {
  if (year % 4 === 0 || (year % 100 === 0 && year % 400 === 0)) {
    months[1] = 29;
  } else {
    months[1] = 28;
  }
}

document
  .querySelector(".calculate-age")
  .addEventListener("click", calculateAge)
