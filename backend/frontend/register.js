import { sendUserData, checkUserStatus } from "../getUserData.js";

const registerForm = document.querySelector(".register-form");

function registering(name, surname){
  console.log(`registering as ${name} ${surname}`);
  document.location.href = "./index.html";
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
    money: 0,
    admin: false
  };

  if (!passwordMatch(userData.password, repeatPassword)) {
    difPasswords();
    return;
  }

  const type="main";

  //check if user exists
  if (await checkUserStatus(name, surname, type)) {
    userExists();
    return;
  }
  registering(name, surname)
  sendUserData(userData, "register");
});
