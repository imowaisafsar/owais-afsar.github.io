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

  $('#signUpBtn').attr('disabled', 'disabled');
  $('.signUpBtn-text').hide();
  $('.signUpBtn-loader').show();
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

        $('#signUpBtn').removeAttr('disabled');
        $('.signUpBtn-text').show();
        $('.signUpBtn-loader').hide();
      });
  } catch (err) {
    toastr.error(err.message, "Error");

    $('#signUpBtn').removeAttr('disabled');
    $('.signUpBtn-text').show();
    $('.signUpBtn-loader').hide();
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

      $('#signUpBtn').removeAttr('disabled');
      $('.signUpBtn-text').show();
      $('.signUpBtn-loader').hide();
    })
    .catch((err) => {
      toastr.error(err.message, "Error");

      $('#signUpBtn').removeAttr('disabled');
      $('.signUpBtn-text').show();
      $('.signUpBtn-loader').hide();
    });
};
