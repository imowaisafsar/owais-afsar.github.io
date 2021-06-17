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
// piano keydown
window.addEventListener("keydown", (e) => {
  playPiano(e.keyCode);
});

const pianoKeyClick = (keyStr) => {
  let key = Number(keyStr.getAttribute("data-key"));
  playPiano(key);
};

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
      hour < 10 ? `0${hour}` : hour;
    document.querySelector(".clock-minute").innerText =
      minute < 10 ? `0${minute}` : minute;
    document.querySelector(".clock-second").innerText =
      second < 10 ? `0${second}` : second;
    await timer(500); // then the created Promise can be awaited
  }
};
digitalClock();

const monthsArr = [
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
const calculateAgeee = () => {
  let currenDateMs = new Date().getTime();
  let date = document.querySelector(".date").value;
  let month = document.querySelector(".month").value;
  let year = document.querySelector(".year").value;
  let birthDateMs = new Date(`${date} ${monthsArr[month]} ${year}`).getTime();
  //   console.log(new Date(`${date} ${monthsArr[month]} ${year}`))
  let diffMs = currenDateMs - birthDateMs;
  let diffYear = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
  let diffMonth = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
  let diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
  console.log(claculatedAge);
};

function calculateAgee() {
  //   let date = new Date();
  let currentDay = new Date().getDate();
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let birthDay = document.querySelector(".date").value;
  let birthMonth = document.querySelector(".month").value;
  let birthYear = document.querySelector(".year").value;
  // birthDate = new Date(birthDate);
  let birthDate = new Date(`${birthDay} ${monthsArr[birthMonth]} ${birthYear}`);
  let currentDate = new Date(
    `${currentDay} ${monthsArr[currentMonth]} ${currentYear}`
  );

  var date = currentDate.getDate() - birthDate.getDate();
  var month = currentDate.getMonth() - birthDate.getMonth();
  var years = currentDate.getFullYear() - birthDate.getFullYear();

  console.log(date);
  console.log(month);
  console.log(years);
}

function calculateAge() {
    let datePicked = document.querySelector(".date-picker").value;
    console.log(datePicked);
}
document
  .querySelector(".calculate-age")
  .addEventListener("click", calculateAge);
