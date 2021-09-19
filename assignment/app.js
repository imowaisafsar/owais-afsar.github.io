const firebaseConfig = {
  apiKey: "AIzaSyCVHl4wpsQSdCdeDY7EVHw9jUoVMKyp2cI",
  authDomain: "balloon-game-5c8a0.firebaseapp.com",
  projectId: "balloon-game-5c8a0",
  storageBucket: "balloon-game-5c8a0.appspot.com",
  messagingSenderId: "694569494557",
  appId: "1:694569494557:web:74a94722247297bbd03ef4",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
// const auth = firebase.auth();
let currentUser;
let currentUserInfo;
let currentLevel;
let currentScore;
let currentLifeLine;
let currentPopCount = 0;

let currentGameColor;
let currentGameColorCount = 0;
var colors = ["red", "green", "blue", "yellow", "purple"];

let currentBaloonColors = [];
let addFreshBaloons = [];

toastr.options = {
  closeButton: $("#closeButton").prop("checked"),
  debug: $("#debugInfo").prop("checked"),
  newestOnTop: $("#newestOnTop").prop("checked"),
  progressBar: $("#progressBar").prop("checked"),
  // rtl: $("#rtl").prop("checked"),
  positionClass:
    $("#positionGroup input:radio:checked").val() || "toast-top-right",
  preventDuplicates: $("#preventDuplicates").prop("checked"),
  onclick: null,
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    document.getElementById("login_section").style.display = "none";
    document.getElementById("dashboard_section").style.display = "block";
    document.getElementById("game_section").style.display = "none";
    preparedDashboard();
  } else {
    document.getElementById("login_section").style.display = "block";
    document.getElementById("dashboard_section").style.display = "none";
    document.getElementById("game_section").style.display = "none";
  }
});

const googleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      var user = result.user;
      currentUser = user;
      if (result.additionalUserInfo.isNewUser) {
        setUserDb();
      } else {
        updateUserDb();
      }
    })
    .catch((error) => {
      toastr.error(error.message, "Error");
      // console.log(error.message);
    });
};

const signOut = () => {
  firebase
    .auth()
    .signOut()
    .then((result) => {
      // console.log(`Sign out success: `, result);
      toastr.success("Sign out successfully.", "Success");
    })
    .catch((error) => {
      // console.log(`Sign out error: `, error.message);
      toastr.error(err.message, "Error");
    });
};

const setUserDb = () => {
  let user = {
    userId: currentUser.uid,
    name: currentUser.displayName,
    email: currentUser.email,
    photoUrl: currentUser.photoURL,
    highestScore: 0,
    lastLevel: 1,
    lastLoggedIn: new Date(),
    lastPlayed: new Date(),
  };
  firestore
    .collection("users")
    .doc(currentUser.uid)
    .set(user)
    .then((res) => {
      console.log(res);
      toastr.success("Sign up successfully.", "Success");
    })
    .catch((err) => {
      toastr.error(err.message, "Error");
    });
};

const updateUserDb = () => {
  let user = {
    lastLoggedIn: new Date(),
  };
  firestore
    .collection("users")
    .doc(currentUser.uid)
    .update(user)
    .then((res) => {
      console.log(res);
      toastr.success("Sign in successfully.", "Success");
    })
    .catch((err) => {
      toastr.error(err.message, "Error");
    });
};

const getUserInfo = async () => {
  var userDoc = firestore.collection("users").doc(currentUser.uid);
  await userDoc
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        currentUserInfo = userData;
      } else {
        toastr.warning("No data found.", "Error");
      }
    })
    .catch((error) => {
      console.log(error);
      toastr.error(error, "Error");
    });
};

const preparedDashboard = async () => {
  await getUserInfo();
  document.getElementById("userName").innerText = currentUserInfo.name;
  document.getElementById("lastLoggedIn").innerText =
    currentUserInfo.lastLoggedIn.toDate();
  document.getElementById("highestScore").innerText =
    currentUserInfo.highestScore;
  document.getElementById("lastLevel").innerText = currentUserInfo.lastLevel;
  document.getElementById("lastPlayed").innerText =
    currentUserInfo.lastPlayed.toDate();
};

const quitGame = () => {
  document.getElementById("login_section").style.display = "none";
  document.getElementById("dashboard_section").style.display = "block";
  document.getElementById("game_section").style.display = "none";
  $("#gamePad").empty();
  currentBaloonColors = [];
  addFreshBaloons = [];
  currentPopCount = 0;
};

const goToGame = async () => {
  await getUserInfo();

  document.getElementById("login_section").style.display = "none";
  document.getElementById("dashboard_section").style.display = "none";
  document.getElementById("game_section").style.display = "block";

  currentLevel = 1;
  currentScore = 0;
  currentLifeLine = 3;
  currentPopCount = 0;

  document.getElementById("CurrentLevel").innerText = currentLevel;
  document.getElementById("CurrentScore").innerText = currentScore;
  document.getElementById("CurrentLifeLine").innerText = currentLifeLine;
  document.getElementById("HighestLevel").innerText =
    currentUserInfo.highestScore;

  setCurrentColorForPlayer();
  setTimeout(() => {
    playGame({ level: currentLevel, life: currentLifeLine });
  }, 2000);
};

const playGame = ({ level, life }) => {
  // colors
  let count = 24;
  for (let index = 0; index < count; index++) {
    let random = Number(Math.floor(Math.random() * colors.length));
    currentBaloonColors.push(colors[random]);
    var baloon = `<div class="col-lg-2 col-md-2 mb-4 baloon-container" id="baloon-container_${index}">
      <div class="baloon baloon-${colors[random]}" id="baloon_${index}" onmouseover="popBaloon('${colors[random]}', ${index})"></div>
      <span class="baloon-text d-none baloon-text-${colors[random]}" id="baloon-text-${colors[random]}_${index}">POP!</span>
    </div>`;
    $("#gamePad").append(baloon);
  }
  baloonPopLimit();
};

const baloonPopLimit = () => {
  currentGameColorCount = 0;
  currentBaloonColors.forEach((element) => {
    if (currentGameColor == element) {
      currentGameColorCount++;
    }
  });
  // console.log(currentGameColorCount);
};

const popBaloon = (color, index) => {
  let idx = currentBaloonColors.indexOf(color);
  if (idx > -1) {
    console.log(idx);
    addFreshBaloons.splice(idx, idx + 1);
  }
  console.log(currentBaloonColors);
  //
  document.getElementById(`baloon_${index}`).remove();
  document
    .getElementById(`baloon-text-${color}_${index}`)
    .classList.add("d-block-imp");
  setTimeout(() => {
    document.getElementById(`baloon-text-${color}_${index}`).remove();
  }, 500);
  //
  if (color !== currentGameColor) {
    currentLifeLine--;
    document.getElementById("CurrentLifeLine").innerText = currentLifeLine;
  } else {
    currentPopCount++;
    currentScore++;
    document.getElementById("CurrentScore").innerText = currentScore;
    if (currentGameColorCount == currentPopCount) {
      setCurrentColorForPlayer();
      currentPopCount = 0;
    }
  }
  //
  if (currentLifeLine <= 0) {
    toastr.warning(
      `You played well and made ${currentScore} srores.`,
      "Failed"
    );
    preparedDashboard();
    setTimeout(() => {
      quitGame();
      updateUserScore();
    }, 600);
  }
  //
  addFreshBaloons.push(index);
  addFreshBaloonFn();
};

const updateUserScore = () => {
  console.log(currentUserInfo.highestScore);
  let highScore;
  if (currentUserInfo.highestScore < currentScore) {
    highScore = currentScore;
  } else {
    currentUserInfo.highestScore;
  }
  let user = {
    highestScore: highScore,
    lastLevel: currentLevel,
    lastPlayed: new Date(),
  };
  firestore
    .collection("users")
    .doc(currentUser.uid)
    .update(user)
    .then((res) => {})
    .catch((err) => {});
};

const setCurrentColorForPlayer = () => {
  //gameInfo
  currentGameColor = colors[Number(Math.floor(Math.random() * colors.length))];
  console.log(currentGameColor);
  var text = `You have to POP ${currentGameColor.toUpperCase()} color.`;
  document.getElementById("gameInfo").innerText = text;
  baloonPopLimit();
};

const addFreshBaloonFn = () => {
  if (addFreshBaloons.length > 0) {
    addFreshBaloons.forEach((element) => {
      setTimeout(() => {
        let random = Number(Math.floor(Math.random() * colors.length));
        currentBaloonColors.push(colors[random]);
        var baloon = `
      <div class="baloon baloon-${colors[random]}" id="baloon_${element}" onmouseover="popBaloon('${colors[random]}', ${element}, 'baloon-container_${element}')"></div>
      <span class="baloon-text d-none baloon-text-${colors[random]}" id="baloon-text-${colors[random]}_${element}">POP!</span>`;
        $(`#baloon-container_${element}`).append(baloon);
      }, 1500);
      const index = addFreshBaloons.indexOf(element);
      if (index > -1) {
        addFreshBaloons.splice(index, index + 1);
      }
      console.log(addFreshBaloons);
    });
  }
  console.log(currentBaloonColors);
};

// const prepareGame = () => {
//   let count = 30;
//   for (let index = 0; index < count; index++) {
//     let baloon = ``
//     document.getElementById('gamePad').appendChild = baloon;

//   }
// };
