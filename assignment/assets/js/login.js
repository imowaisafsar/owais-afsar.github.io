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

const handleLogin = () => {
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  if (email === "" || email === null) {
    toastr.error("Email can not be empty.");
    return;
  }
  if (password === "" || password === null) {
    toastr.error("Password can not be empty.");
    return;
  }
  $('#signInBtn').attr('disabled', 'disabled');
  $('.signInBtn-text').hide();
  $('.signInBtn-loader').show();
  login(email, password);
};
document.querySelector("#signInBtn").addEventListener("click", handleLogin);

const login = (email, password) => {
  try {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
        toastr.success("Logged in successfully.", "Success");
        checkAuthState();
        $('#signInBtn').removeAttr('disabled');
        $('.signInBtn-text').show();
        $('.signInBtn-loader').hide();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        toastr.error(errorMessage, "Error");
        $('#signInBtn').removeAttr('disabled');
        $('.signInBtn-text').show();
        $('.signInBtn-loader').hide();
      });
  } catch (err) {
    toastr.error(err.message, "Error");
    $('#signInBtn').removeAttr('disabled');
    $('.signInBtn-text').show();
    $('.signInBtn-loader').hide();
  }
};
