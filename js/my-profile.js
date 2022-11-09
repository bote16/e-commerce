const form = document.getElementById("formProfile");


form.addEventListener(
  "submit",
  function (e) {
    form.classList.add("was-validated");
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
  },
  false
);
