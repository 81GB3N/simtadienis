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

function combineAllNameSurname(users){
    let combinedArray = [];
    users.forEach(user => {
        if(user.admin === false) 
            combinedArray.push(`${user.name} ${user.surname}`);
    });
    return combinedArray;
}

async function allNameList() {
    const allUsers = await getAllUsers();
    combineAllNameSurname(allUsers.result);
    return allUsers.result;
  }
  
const allUsers = await allNameList();

function userDoesntExist(){
    console.log("user doesnt exist");
}

const fullName = document.querySelector("#full-name");

fullName.addEventListener('input', displayUsers);

let fullNameValue;

function findMatchingName(){
    fullNameValue = fullName.value.toLowerCase();
      const userNameArray = combineAllNameSurname(allUsers);
    //   console.log(userNameArray)
    const matchingNames = userNameArray.filter(user =>
        user.toLowerCase().includes(fullNameValue)
    );
    return matchingNames;
  }

  function addListListener(){
    const listItems = document.querySelectorAll(".user-list li");
    listItems.forEach(item => {
    item.addEventListener("click", selectUser);
  });
  }

  function displayUsers(){
    const userList = document.querySelector(".user-list");
    userList.innerHTML = '';
    const matchingNames = findMatchingName();
    // console.log(matchingNames);
    matchingNames.forEach(name => {
        userList.innerHTML += `<li>${name}</li>`;
    });
    addListListener();
  }
  
  function selectUser(){
    fullName.value = this.innerHTML;
    displayUsers();
  }

  adminSubmit.addEventListener('submit', async (e)=>{
      e.preventDefault();
      
    fullNameValue = fullName.value.toLowerCase();
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
        history: tru
    }
    sendUserData(history, "write-history");
    //find person and add money to that user as well as who added it 
})