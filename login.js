import {getUserData, checkUserStatus} from "./getUserData.js";

const loginForm = document.querySelector(".login-form");

async function UserInfo(name, surname, password){
  const info = await getUserData(name, surname);
  // console.log(info.result[0], password === info.password ? true : false, info.result.password)
  return password === info.result[0].password ? true : false;
}

function userDoesntExist(){
  console.log("user doesnt exist");
}

function badLoginInfo(){
  console.log("the entered user info doesnt match the password");
}

function loadingProfile(){
  console.log("loading your profile");
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
if(await checkUserStatus(userData.name, userData.surname) === false){
  userDoesntExist();
  return;
}
else if(await UserInfo(userData.name, userData.surname, userData.password) === false){
  badLoginInfo();
  return;
}
loadingProfile();
  // fetchUserData(userData, "login");
});
