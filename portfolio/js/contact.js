$(function () {
  "use strict";
  // init the validator
  // validator files are included in the download package
  // otherwise download from http://1000hz.github.io/bootstrap-validator
  $("#contact-form").validator();
  // when the form is submitted
  $("#contact-form").on("submit", function (e) {
    // if the validator does not prevent form submit
    if (!e.isDefaultPrevented()) {
      e.preventDefault();

      $(".contact-submit").attr("disabled", "disabled");
      $(".contact-btn-txt").hide();
      $(".contact-btn-loader").show();
      //   Get input Values
      let name = document.querySelector("#InputName").value;
      let email = document.querySelector("#InputEmail").value;
      let subject = document.querySelector("#InputSubject").value;
      let message = document.querySelector("#InputMessage").value;

      notifyStatus("", "", false, false);
      if (ValidateEmail(email) == "false") {
        notifyStatus(
          "danger",
          "Please insert correct email address.",
          false,
          true
        );
        return;
      }
      sendEmail(name, email, subject, message);
    }
  });
});

var ValidateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return re.test(String(email).toLowerCase());
  if (re.test(String(email).toLowerCase())) {
    return "true";
  } else {
    return "false";
  }
};

const notifyStatus = (status, message, formReset, buttonReset) => {
  // we recieve the type of the message: success x danger and apply it to the
  var messageAlert = "alert-" + status;
  var messageText = message;

  // let's compose Bootstrap alert box HTML
  var alertBox =
    '<div class="alert ' +
    messageAlert +
    ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
    messageText +
    "</div>";

  $(".messages").empty();
  // If we have messageAlert and messageText
  if (messageAlert && messageText) {
    // inject the alert to .messages div in our form
    $("#contact-form").find(".messages").html(alertBox);
  }
  if (formReset) {
    // empty the form
    $("#contact-form")[0].reset();
  }
  if (buttonReset) {
    $(".contact-submit").removeAttr("disabled");
    $(".contact-btn-txt").show();
    $(".contact-btn-loader").hide();
  }
};

function sendEmail(name, email, subject, message) {
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
  }).then((message) => {
    if (message === "OK") {
      // reset form data
      document.querySelector(".contact-form").reset();

      notifyStatus(
        "success",
        "Your message has been delivered successfully. I will get back to you soon.",
        true,
        true
      );
    } else {
      // error message
      notifyStatus(
        "danger",
        "Something went wrong. Please try another way to connect with me.",
        false,
        true
      );
    }
  });
}