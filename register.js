import fetchUserData from "./fetchUserData.js";

const registerForm = document.querySelector(".register-form");

function difPasswords(){
  console.log("passwords dont match");
}

async function getUserInfo(name, surname){
  const response = await fetch(`http://localhost:3000/api?name=${name}&surname=${surname}`);
  const data = await response.json();
  // console.log(data.result, Object.keys(data.result).length);
  return data;
}

function passwordMatch(password, repeatPassword){
  return password === repeatPassword;
}

async function checkUserStatus(name, surname){
  const userInfo = await getUserInfo(name, surname);
  
  const usersAmount = Object.keys(userInfo.result).length;
    console.log(usersAmount);
    return usersAmount > 0 ? true : false;
}

function userExists(){
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
    repeatPassword: repeatPassword
};
  
  if(!passwordMatch(userData.password, userData.repeatPassword)){
   difPasswords();
    return;
  }
  if(await checkUserStatus(userData.name, userData.surname)){
    userExists();
    return;
  }
  fetchUserData(userData, "register");
});
