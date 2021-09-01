let currentUser;
const checkAuthState = () => {
  auth.onAuthStateChanged((user) => {
    currentUser = user;
    if (user) {
      console.log(user);
    } else {
      window.location.href = "index.html";
    }
  });
};
// checkAuthState();

const getCurrentUser = async () => {
  await checkAuthState();
  console.log(currentUser);
  firestore
    .collection("users")
    .where("isActive", "==", true & "userId", "==", currentUser.uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        //   console.log(doc.id, " => ", doc.data());
        console.log(doc.data());
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
};
getCurrentUser();

const signOut = () => {
  try {
    auth.signOut();
    checkAuthState();
  } catch (err) {
    toastr.error(err.message, "Error");
  }
};
document.querySelector("#signOutBtn").addEventListener("click", signOut);
