const signOut = () => {
  try {
    auth.signOut();
    checkAuthState();
  } catch (err) {
    toastr.error(err.message, "Error");
  }
};
document.querySelector("#signOutBtn").addEventListener("click", signOut);

let currentUserAuth;
let currentUserProfile;

auth.onAuthStateChanged((user) => {
  currentUserAuth = user;
  if (user) {
    console.log(currentUserAuth);
    getCurrentUser();
  } else {
    window.location.href = "index.html";
  }
});

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
      document.querySelector("#current_user_profile_text").innerText =
        currentUserProfile.userName;
    })
    .catch((error) => {
      toastr.error(error.message, "Error");
      console.log("Error getting documents: ", error);
    });
};

let $teamName = document.querySelector("#createTeamName");
let $teamType = document.querySelector("#createTeamType");
let $teamMembers = [];

const removeTeamEmail = (index) => {
  console.log(index)
  if (index > -1) {
    $teamMembers.splice(index, 1);
  }
  printTeamMembers();
};

const printTeamMembers = () => {
  document.getElementById("teamMembers").innerHTML = '';
  let html = "<ul>";
  $teamMembers.forEach((element, index) => {
    html += `<li>${element} &nbsp; <i class="fas fa-trash text-danger" onclick="removeTeamEmail(${index})"></i></li>`;
  });
  html + `</ul>`;
  document.getElementById("teamMembers").innerHTML = html;
}

const createTeamEmail = () => {
  let input = document.getElementById("createTeamEmail");
  $teamMembers.push(input.value);
  input.value = ``;
  printTeamMembers();
};
document
  .querySelector("#AddTeamMember")
  .addEventListener("click", createTeamEmail);

const createTeam = () => {
  var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

  let validMail = true;
  $teamMembers.forEach(element => {
    if (!pattern.test(element)) {
      validMail = false;
    }
  })
  if (!validMail) {
    toastr.error('Team members email is badly formatted.', "Error");
    return;
  }

  if ($teamName.value == '' || $teamType.value == '' || $teamMembers.length == 0) {
    toastr.warning('Fill details correctly.', "Alert");
    return false;
  }

  let obj = {
    teamName: $teamName.value,
    teamType: $teamType.value,
    teamMembers: $teamMembers,
    createdBy: currentUserAuth.uid,
  };
  console.log(obj);
  try {
    firestore.collection("teams").add(obj);
    toastr.success("Team has been created", "Success");
    $("#staticBackdrop").modal("hide");
    getAllTeam();
  } catch (err) {
    toastr.error(err.message, "Error");
  }
};
document.querySelector("#createTeam").addEventListener("click", createTeam);

const getAllTeam = () => {
  firestore
    .collection("teams")
    .get()
    .then((querySnapshot) => {
      $("#teamCreatedByYou").html('');
      $("#teamYouAreMemberOf").html('');
      querySnapshot.forEach((doc) => {
        item = doc.data();
        ////
        let members;
        let memberOf = false;
        item.teamMembers.forEach((element) => {
          members += element + ", ";
          if (element == currentUserAuth.email) {
            console.log(element)
            memberOf = true
          }
        });
        if (item.createdBy == currentUserAuth.uid && memberOf == false) {
          let html = `<div class="col-md-4"><div class="card">
          <div class="card-body">
          <h5 class="card-title"><small>Team Name:</small> ${item.teamName}</h5>
          <p class="card-text"><small>Team Members:</small> ${members}</p>
          </div>
          </div>
          </div>`;
          $("#teamCreatedByYou").append(html);
        } else if (memberOf == true) {
          let html = `<div class="col-md-4"><div class="card">
          <div class="card-body">
          <h5 class="card-title"><small>Team Name:</small> ${item.teamName}</h5>
          <p class="card-text"><small>Team Members:</small> ${members}</p>
          </div>
          </div>
          </div>`;
          $("#teamYouAreMemberOf").append(html);
        }

      })
    })
    .catch((error) => {
      toastr.error(error.message, "Error");
      console.log("Error getting teams: ", error);
    });
};
getAllTeam();
