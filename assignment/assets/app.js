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

const pianoKeyPress = (keyStr) => {
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
    console.log(`${hour}:${minute}:${second}`)
    document.querySelector(".clock-hour").innerText = hour
    document.querySelector(".clock-minute").innerText = minute
    document.querySelector(".clock-second").innerText = second
    await timer(1000); // then the created Promise can be awaited
  }
};
digitalClock();

