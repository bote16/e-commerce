const form = document.getElementById("formProfile");

let inputEmail = document.getElementById("inputUserProfile_Email");
let inputName = document.getElementById("inputUserProfile_Name");
let inputLastname = document.getElementById("inputUserProfile_Lastname");

const emailToInput = function () {
  inputEmail.value = INFO_USER;
};

const checkLocalStorageProfileInfo = function () {
  let LSTOR_name = JSON.parse(localStorage.getItem("profileName"));
  let LSTOR_lastname = JSON.parse(localStorage.getItem("profileLastname"));
  if (!LSTOR_name && !LSTOR_lastname == "") {
    return false;
  }
  return true;
};

document.addEventListener("DOMContentLoaded", () => {
  emailToInput();
  if (checkLocalStorageProfileInfo()) {
    inputName.value = JSON.parse(localStorage.getItem("profileName"));
    inputLastname.value = JSON.parse(localStorage.getItem("profileLastname"));
  }

  form.addEventListener(
    "submit",
    function (e) {
      form.classList.add("was-validated");
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      localStorage.setItem("profileName", JSON.stringify(inputName.value));
      localStorage.setItem(
        "profileLastname",
        JSON.stringify(inputLastname.value)
      );
    },
    false
  );
});
