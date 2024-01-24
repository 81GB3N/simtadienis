import { checkUserStatus, sendUserData } from "./getUserData.js";

const adminSubmit = document.querySelector(".admin-form");

const user = document.querySelector(".username");
const logoutButton = document.querySelector(".logout");

function logout(){
    localStorage.removeItem("user")
    document.location.href = "./index.html";
}

logoutButton.addEventListener('click', logout);

if(localStorage.getItem("user") === null || JSON.parse(localStorage.getItem("user")).admin === false) logout()

const adminData = JSON.parse(localStorage.getItem("user"));
user.innerHTML = `${adminData.name} ${adminData.surname}`;

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

    const type="main"

    if(await checkUserStatus(name, surname, type) === false){
        userDoesntExist();
        return;
    }
    sendUserData(userData, "addmoney");

    const currentTime = new Date();

    const history = {
        name: name,
        surname: surname,
        adminname: adminData.name,
        adminsurname: adminData.surname,
        amount: amount,
        time: currentTime,
        history: true
    }
    sendUserData(history, "write-history");
    //find person and add money to that user as well as who added it 
})