const form = document.getElementById("formProfile");

let imgPhotoProfile = document.getElementById("imgPhotoProfile");
let inputEmail = document.getElementById("inputUserProfile_Email");
let inputName = document.getElementById("inputUserProfile_Name");
let inputLastname = document.getElementById("inputUserProfile_Lastname");
let inputSecondName = document.getElementById("inputProfile_secondName");
let inputSecondSurname = document.getElementById(
  "inputUserProfile_SecondSurname"
);
let inputPhoneNumber = document.getElementById("inputUserProfile_PhoneNumber");
let inputPhoto = document.getElementById("inputUserProfile_Photo");

//when chosen photo, load img..
const onFileSelected = function (event) {
  var target = event.target;
  files = target.files;
  //check support FileAPI
  if (FileReader && files && files.length) {
    var selectedPhoto = files[0];
    // obj file
    var reader = new FileReader();

    imgPhotoProfile.title = selectedPhoto.name;
    //if file read successfully event.onload, change img src, result attribute contains data url
    reader.onload = function (event) {
      imgPhotoProfile.src = event.target.result;
      //send usable url value to localstorage
      localStorage.setItem("profilePhoto", JSON.stringify(reader.result));
    };
    // read result data
    reader.readAsDataURL(selectedPhoto);
  } else {
    return;
  }
};

const checkProfilePhoto = function () {
  let LSTOR_photo = JSON.parse(localStorage.getItem("profilePhoto"));
  if (LSTOR_photo) {
    return true;
  }
  return false;
};

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
  if (checkProfilePhoto()) {
    imgPhotoProfile.src = JSON.parse(localStorage.getItem("profilePhoto"));
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
