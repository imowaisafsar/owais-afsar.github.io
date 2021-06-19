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

function calculateAge() {
  let datePicked = document.querySelector(".date-picker").value;
  console.log(datePicked);
}
// document
//   .querySelector(".calculate-age")
//   .addEventListener("click", calculateAge);
