let currentUserAuth;
let currentUserProfile;

auth.onAuthStateChanged((user) => {
  currentUserAuth = user;
  if (user) {
    console.log(currentUserAuth);
    getCurrentUser()
  } else {
    window.location.href = "index.html";
  }
})

const getCurrentUser = async () => {
  firestore
    .collection("users")
    .where("isActive", "==", true)
    .where("userId", "==", currentUserAuth.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        currentUserProfile = doc.data();
      });
      document.querySelector('#current_user_profile_text').innerText = currentUserProfile.userName;
    })
    .catch((error) => {
      toastr.error(error.message, "Error");
      console.log("Error getting documents: ", error);
    });

};

const signOut = () => {
  try {
    auth.signOut();
    checkAuthState();
  } catch (err) {
    toastr.error(err.message, "Error");
  }
};
document.querySelector("#signOutBtn").addEventListener("click", signOut);
