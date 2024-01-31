import { checkUserStatus, sendUserData, getAllUsers } from "./getUserData.js";

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


async function allNameList() {
    const allUsers = await getAllUsers();
    return allUsers.result;
  }
  
const allUsers = await allNameList();

function userDoesntExist(){
    console.log("user doesnt exist");
}

const fullName = document.querySelector("#full-name");

fullName.addEventListener('input', displayUsers);

function getFullName(){
    return fullName.textContent.toLowerCase();  
}

  adminSubmit.addEventListener('submit', async (e)=>{
      e.preventDefault();
      
    const fullNameValue = getFullName();
      const [name, surname] = fullNameValue.split(/\s+/).map(part => part.trim());

    const amount = document.querySelector("#amount").value;

    console.log(name, surname)

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
})