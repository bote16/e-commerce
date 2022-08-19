document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.getElementById("form_login");

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const USER = formulario.querySelector('#usuario');
    const PASS = formulario.querySelector('#password');

    if(USER.value == '' || PASS.value == ''){
      alert('Verifique que los datos ingresados sean correctos')

    } else {
      window.location.href="home.html";
    }
  });
});
