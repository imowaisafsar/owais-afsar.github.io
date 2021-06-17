const playPiano = (keyCode) => {
  console.log(keyCode);
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
