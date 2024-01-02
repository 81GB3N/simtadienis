import { sendUserData, checkUserStatus } from "./getUserData.js";

const registerForm = document.querySelector(".register-form");

function difPasswords() {
  console.log("passwords dont match");
}

function passwordMatch(password, repeatPassword) {
  return password === repeatPassword;
}

function userExists() {
  console.log("this user already exists");
}

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const surname = document.querySelector("#surname").value;
  const password = document.querySelector("#password").value;
  const repeatPassword = document.querySelector("#repeat-password").value;

  const userData = {
    name: name,
    surname: surname,
    password: password,
    repeatPassword: repeatPassword,
  };

  if (!passwordMatch(userData.password, userData.repeatPassword)) {
    difPasswords();
    return;
  }
  if (await checkUserStatus(userData.name, userData.surname)) {
    userExists();
    return;
  }
  sendUserData(userData, "register");
});
