import {getUserData, checkUserStatus} from "./getUserData.js";

const loginForm = document.querySelector(".login-form");

if(localStorage.getItem("user") !== null){
  loadProfile();
}

function setUserLocalStorage(name, surname){
  const user = {name: name, surname: surname, admin: false};
  localStorage.setItem("user", JSON.stringify(user));
}

async function UserInfo(name, surname, password){
  const info = await getUserData(name, surname);
  return password === info.result[0].password ? true : false;
}

function userDoesntExist(){
  console.log("user doesnt exist");
}

function badLoginInfo(){
  console.log("the entered user info doesnt match the password");
}

function loadUser(){
  console.log("logging into user");
  document.location.href = "http://localhost:5500/user.html"; 
}

function loadAdmin(name, surname){
  const adminUser = {name: name, surname: surname, admin: true};
    localStorage.setItem("user", JSON.stringify(adminUser));
    console.log("logging into admin")
    document.location.href = "http://localhost:5500/admin.html";
}

async function loadProfile(){
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("loading your profile", user.name, user.surname);
  const userData = await getUserData(user.name, user.surname);
  if(userData.result[0].admin) loadAdmin(user.name, user.surname);
  else loadUser();

}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const surname = document.querySelector("#surname").value;
  const password = document.querySelector("#password").value;

  const userData = {
    name: name,
    surname: surname,
    password: password,
  };
  
if(await checkUserStatus(name, surname) === false){
  userDoesntExist();
  return;
}
else if(await UserInfo(name, surname, userData.password) === false){
  badLoginInfo();
  return;
}
setUserLocalStorage(name, surname);
loadProfile();
});
