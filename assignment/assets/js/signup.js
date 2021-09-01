const checkAuthState = () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      window.location.href = "dashboard.html";
    } else {
      console.log(user);
    }
  });
};
checkAuthState();

const handleSignup = () => {
  let fullname = document.querySelector("#fullname").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  if (fullname === "" || fullname === null) {
    toastr.error("Full name can not be empty.");
    return;
  }
  if (email === "" || email === null) {
    toastr.error("Email can not be empty.");
    return;
  }
  if (password === "" || password === null) {
    toastr.error("Password can not be empty.");
    return;
  }
  signup(email, password, fullname);
};
document.querySelector("#signUpBtn").addEventListener("click", handleSignup);

const signup = (email, password, name) => {
  try {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user.uid);
        createUserDb(user.uid, name);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        toastr.error(errorMessage, "Error");
      });
  } catch (err) {
    toastr.error(err.message, "Error");
  }
};

const createUserDb = (uId, name) => {
  let user = {
    userId: uId,
    userName: name,
    createdAt: new Date(),
    isActive: true,
  };
  firestore
    .collection("users")
    .add(user)
    .then((res) => {
      console.log(res);
      toastr.success("Signed up successfully.", "Success");
    })
    .catch((err) => {
      toastr.error(err.message, "Error");
    });
};
