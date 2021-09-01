const handleLogin = () => {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  if (email === "" || email === null) {
    toastr.error("Email can not be empty");
    return;
  }
  if (password === "" || password === null) {
    toastr.error("Password can not be empty");
    return;
  }
  login(email, password);
};
document.querySelector("#signInBtn").addEventListener("click", handleLogin);

const login = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user);
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
      // ..
    });
};
