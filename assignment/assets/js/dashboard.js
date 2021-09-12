
const signOut = () => {
  auth.signOut()
    .then((res) => {
      console.log(res)
    })
};
document.querySelector("#signOutBtn").addEventListener("click", signOut);

let currentUserAuth;
let currentUserProfile;

auth.onAuthStateChanged((user) => {
  if (user) {
    currentUserAuth = user;
    // console.log(currentUserAuth);
    getCurrentUser();
    getAllTeam();
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

const removeTeamMember = (index) => {
  if (index > -1) {
    $teamMembers.splice(index, 1);
  }
  printTeamMembers();
};

const printTeamMembers = () => {
  document.getElementById("teamMembers").innerHTML = '';
  let html = "<ul>";
  $teamMembers.forEach((element, index) => {
    html += `<li>${element} &nbsp; <i class="fas fa-trash text-danger" onclick="removeTeamMember(${index})"></i></li>`;
  });
  html + `</ul>`;
  document.getElementById("teamMembers").innerHTML = html;
}

const addTeamMember = () => {
  let input = document.getElementById("createTeamEmail");
  $teamMembers.push(input.value);
  input.value = ``;
  printTeamMembers();
};
document
  .querySelector("#AddTeamMember")
  .addEventListener("click", addTeamMember);

const createTeam = async () => {
  var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

  let includeYourself = false;
  let validMail = true;
  $teamMembers.forEach(element => {
    if (element === currentUserAuth.email) {
      includeYourself = true;
    }
    if (!pattern.test(element)) {
      validMail = false;
    }
  })
  if (includeYourself) {
    toastr.error('You are the team manager, can not add your mail in members list. Try removing your mail and try again.', "Error");
    return;
  }
  if (!validMail) {
    toastr.error('Team members email is badly formatted.', "Error");
    return;
  }

  let teamName = $teamName.value;
  await createTeamMembersMail({ mails: $teamMembers, name: teamName });

  if ($teamName.value == '' || $teamType.value == '' || $teamMembers.length == 0) {
    toastr.warning('Fill details correctly.', "Alert");
    return false;
  }

  let obj = {
    teamName: $teamName.value,
    teamType: $teamType.value,
    teamMembers: $teamMembers,
    createdBy: currentUserAuth.uid,
    createdAt: new Date()
  };
  // console.log(obj);
  try {
    firestore.collection("teams").add(obj);
    toastr.success("Team has been created", "Success");
    $("#staticBackdrop").modal("hide");
  } catch (err) {
    toastr.error(err.message, "Error");
  }
};
document.querySelector("#createTeam").addEventListener("click", createTeam);

const createTeamMembersMail = ({ mails, name }) => {
  const password = 'Your1stSystemPassword!';
  mails.forEach(email => {
    secondaryApp
      .auth().createUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        secondaryApp.auth().signOut();

        await sendConfirmationMail({ email: email, teamName: name })
      })
      .catch((error) => {
      });
  });
}

const sendConfirmationMail = async ({ email, name }) => {
  Email.send({
    Host: "smtp.gmail.com",
    Username: "owaisafsar.mail@gmail.com",
    Password: "nxpphjtlwnxfofzk",
    To: email,
    From: "owaisafsar.mail@gmail.com",
    Subject: `You are invited to team  ${name}`,
    Body: "And this is the body"
  }).then(
    message => console.log(`Success => `, message)
  ).catch(
    error => console.log(`Error => `, error.message)
  )
}

const getAllTeam = () => {
  let teamsCol = firestore.collection("teams");
  let teamsByYouRef = teamsCol.where("createdBy", "==", currentUserAuth.uid).orderBy("teamName", "desc");
  teamsByYouRef.onSnapshot((snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        item = change.doc.data();
        let members = "";
        item.teamMembers.forEach((element) => {
          members += `${element}, `;
        })
        let html = `<div class="col-md-4"><div class="card">
          <div class="card-body">
          <h5 class="card-title"><small>Team Name:</small> ${item.teamName}</h5>
          <p class="card-text"><small>Team Members:</small> ${members}</p>
          </div>
          </div>
          </div>`;
        $("#teamCreatedByYou").append(html);
      }
    });
  });

  // firestore
  //   .collection("teams")
  //   .get()
  //   .then((querySnapshot) => {
  //     $("#teamCreatedByYou").html('');
  //     $("#teamYouAreMemberOf").html('');
  //     querySnapshot.forEach((doc) => {
  //       item = doc.data();
  //       ////
  //       let members;
  //       let memberOf = false;
  //       item.teamMembers.forEach((element) => {
  //         members += element + ", ";
  //         if (element == currentUserAuth.email) {
  //           memberOf = true
  //         }
  //       });
  //       if (item.createdBy == currentUserAuth.uid && memberOf == false) {
  //         let html = `<div class="col-md-4"><div class="card">
  //         <div class="card-body">
  //         <h5 class="card-title"><small>Team Name:</small> ${item.teamName}</h5>
  //         <p class="card-text"><small>Team Members:</small> ${members}</p>
  //         </div>
  //         </div>
  //         </div>`;
  //         $("#teamCreatedByYou").append(html);
  //       } else if (memberOf == true) {
  //         let html = `<div class="col-md-4"><div class="card">
  //         <div class="card-body">
  //         <h5 class="card-title"><small>Team Name:</small> ${item.teamName}</h5>
  //         <p class="card-text"><small>Team Members:</small> ${members}</p>
  //         </div>
  //         </div>
  //         </div>`;
  //         $("#teamYouAreMemberOf").append(html);
  //       }

  //     })
  //   })
  //   .catch((error) => {
  //     toastr.error(error.message, "Error");
  //     console.log("Error getting teams: ", error);
  //   });
};
