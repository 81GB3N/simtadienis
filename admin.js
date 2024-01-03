import { checkUserStatus, sendUserData } from "./getUserData.js";

const adminSubmit = document.querySelector(".admin-form");

const user = document.querySelector(".username");
const logoutButton = document.querySelector(".logout");

function logout(){
    localStorage.removeItem("user")
    document.location.href = "http://localhost:5500/index.html";
}

logoutButton.addEventListener('click', logout);

if(localStorage.getItem("user") === null || JSON.parse(localStorage.getItem("user")).admin === false) logout()

const userData = JSON.parse(localStorage.getItem("user"));
user.innerHTML = `${userData.name} ${userData.surname}`;

function userDoesntExist(){
    console.log("user doesnt exist");
  }

adminSubmit.addEventListener('submit', async (e)=>{
    e.preventDefault();

    const name = document.querySelector("#name").value;
    const surname = document.querySelector("#surname").value;
    const amount = document.querySelector("#amount").value;

    const userData = {
        name: name,
        surname: surname,
        money: amount,
    }

    if(await checkUserStatus(name, surname) === false){
        userDoesntExist();
        return;
    }
    sendUserData(userData, "addmoney");
    //find person and add money to that user as well as who added it 
})