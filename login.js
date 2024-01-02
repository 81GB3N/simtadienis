import fetchUserData from "./fetchUserData.js";

const loginForm = document.querySelector(".login-form");


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const surname = document.querySelector("#surname").value;
  const password = document.querySelector("#password").value;

  const userData = {
    name: name,
    surname: surname,
    password: password,
};

  // Check for valid password or other validations if needed
  fetchUserData(userData, "login");
});
