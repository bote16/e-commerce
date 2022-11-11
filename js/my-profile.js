const form = document.getElementById("formProfile");

let inputEmail = document.getElementById("inputUserProfile_Email");
let inputName = document.getElementById("inputUserProfile_Name");
let inputLastname = document.getElementById("inputUserProfile_Lastname");
let inputSecondName = document.getElementById("inputProfile_secondName");
let inputSecondSurname = document.getElementById(
  "inputUserProfile_SecondSurname"
);
let inputPhoneNumber = document.getElementById("inputUserProfile_PhoneNumber");

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

const checkNonEssentialProfileInfo = function () {
  let LSTOR_SecondName = JSON.parse(localStorage.getItem("profileSecondName"));
  let LSTOR_SecondSurname = JSON.parse(
    localStorage.getItem("profileSecondSurname")
  );
  let LSTOR_PhoneNumber = JSON.parse(
    localStorage.getItem("profilePhoneNumber")
  );
  if (
    typeof LSTOR_PhoneNumber &&
    typeof LSTOR_SecondName &&
    typeof LSTOR_SecondSurname === "string"
  ) {
    return true;
  }
  return false;
};

document.addEventListener("DOMContentLoaded", () => {
  emailToInput();
  if (checkLocalStorageProfileInfo()) {
    inputName.value = JSON.parse(localStorage.getItem("profileName"));
    inputLastname.value = JSON.parse(localStorage.getItem("profileLastname"));
  }
  if (checkNonEssentialProfileInfo()) {
    inputSecondName.value = JSON.parse(
      localStorage.getItem("profileSecondName")
    );
    inputSecondSurname.value = JSON.parse(
      localStorage.getItem("profileSecondSurname")
    );
    inputPhoneNumber.value = JSON.parse(
      localStorage.getItem("profilePhoneNumber")
    );
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
      localStorage.setItem(
        "profileSecondName",
        JSON.stringify(inputSecondName.value)
      );
      localStorage.setItem(
        "profileSecondSurname",
        JSON.stringify(inputSecondSurname.value)
      );
      localStorage.setItem(
        "profilePhoneNumber",
        JSON.stringify(inputPhoneNumber.value)
      );
    },
    false
  );
});
