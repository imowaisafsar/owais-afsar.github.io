// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDM3xOgy0w-xbxI7ayQGxQhis6mh5aS3xk",
    authDomain: "portfolio-mails.firebaseapp.com",
    databaseURL: "https://portfolio-mails-default-rtdb.firebaseio.com",
    projectId: "portfolio-mails",
    storageBucket: "portfolio-mails.appspot.com",
    messagingSenderId: "144134762683",
    appId: "1:144134762683:web:a938fcec56f8df489db99e",
    measurementId: "G-1PZ7ZELY06"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    let button = document.querySelector(".contact-submit");
    button.setAttribute("disabled", "disabled");
    $('.email_btn_loader').show()

    //   Get input Values
    let name = document.querySelector(".contact-name").value;
    let email = document.querySelector(".contact-email").value;
    let subject = document.querySelector(".contact-subject").value;
    let message = document.querySelector(".contact-message").value;

    saveContactInfo(name, email, message);

    if (name == "" || email == "" || message == "" || subject == "") {
        $("#submit").notify(
            "Please fill details correctly.", "error",
            { position: "bottom" }
        );
        button.removeAttribute("disabled");
        $('.email_btn_loader').hide()
        return
    }
    if(ValidateEmail(email) == "false"){
        $("#submit").notify(
            "Enter correct email address.", "error",
            { position: "bottom" }
        );
        button.removeAttribute("disabled");
        $('.email_btn_loader').hide()
        return
    }

    sendEmail(name, email, subject, message, button)
}

var ValidateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // return re.test(String(email).toLowerCase());
    if (re.test(String(email).toLowerCase())) {
        return "true";
    }
    else {
        return "false";
    }
}

function sendEmail(name, email, subject, message, button) {
    
    Email.send({
        Host: "smtp.gmail.com",
        Username: "owaisafsar.mail@gmail.com",
        Password: "nxpphjtlwnxfofzk",
        To: "owaisafsar.mail@gmail.com",
        From: email,
        Subject: `Portfolio Mail "${subject}"`,
        Body: `
        <b>Name:</b> ${name} <br>
        <b>Email:</b> ${email} <br>
        <b>Subject:</b> ${subject} <br>
        <b>Message:</b> ${message}`,
    })
        .then((message) => {

            if (message === "OK") {
                // reset form data
                document.querySelector(".contact-form").reset();

                // success message
                $("#submit").notify(
                    "Message has been send successfully! I will get back to you ASAP!", "success",
                    { position: "bottom" }
                );
            }else{
                // error message
                $("#submit").notify(
                    "Something went wrong! Kindly pick another way to connect with me.", "error",
                    { position: "bottom" }
                );
            }

            button.removeAttribute("disabled");
            $('.email_btn_loader').hide()

            //console.log(message);
            //alert(message);
        });
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
    let newContactInfo = contactInfo.push();

    newContactInfo.set({
        name: name,
        email: email,
        message: message,
    });
}
