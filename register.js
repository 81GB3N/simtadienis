import { sendUserData, checkUserStatus } from "./getUserData.js";

const registerForm = document.querySelector(".register-form");

function registering(name, surname){
  console.log(`registering as ${name} ${surname}`);
  // document.location.href = "http://localhost:5500/index.html";
}

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
    money: 0,
    admin: false
  };

  const userName = userData.name;
  const userSurname = userData.surname;

  if (!passwordMatch(userData.password, userData.repeatPassword)) {
    difPasswords();
    return;
  }
  if (await checkUserStatus(userName, userSurname)) {
    userExists();
    return;
  }
  registering(userName, userSurname)
  sendUserData(userData, "register");
});
