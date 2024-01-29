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
    // combineAllNameSurname(allUsers.result);
    return allUsers.result;
  }
  
const allUsers = await allNameList();
// console.log(allUsers);

function userDoesntExist(){
    console.log("user doesnt exist");
}

const fullName = document.querySelector("#full-name");

fullName.addEventListener('input', displayUsers);

function getFullName(){
    // const value = fullName.textContent.toLowerCase();
    // if(value[value.length] === ' ')
    //     return value.substring(0, value.length-1);
    return fullName.textContent.toLowerCase();  
}

function findMatchingName(){
      const userNameArray = combineAllNameSurname(allUsers);
    //   console.log(userNameArray)

    const fullNameValue = getFullName().trim();

    const matchingNames = userNameArray.filter(user =>
        user.toLowerCase().includes(fullNameValue)
    );
    // console.log(matchingNames)
    return matchingNames;
  }

//   function findCommonSubstring(firstUser, matching){
//     let result = '';
//     if(matching === undefined)
//         matching = getFullName();
//     console.log(firstUser, matching)
//     for (let i = 0; i < Math.min(firstUser.length, matching.length); i++) {
//       if (firstUser[i] === matching[i]) {
//         result += firstUser[i];
//       } else {
//         break;
//       }
//     }
//     return result;
//   }

function setCursorFront() {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(fullName, fullName.childNodes.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
}


function highLightMatching(targetWord){
    let fullNameValue = getFullName();
    let inputLetter = 0;
    for(let targetLetter in targetWord){
        if(fullNameValue[inputLetter] === targetWord[targetLetter]){
        console.log(fullNameValue[inputLetter], targetWord[targetLetter], fullNameValue[inputLetter] === targetWord[targetLetter]);
            inputLetter++;
        }
        else{
            console.log("not matching")
        }
    }

  }

  function addListListener(){
    const listItems = document.querySelectorAll(".user-list li");
    if(listItems[0]){ 
        listItems[0].classList.add("first");
        highLightMatching(listItems[0].innerHTML);
  }
    listItems.forEach(item => {
    item.addEventListener("click", selectUser);
  });
  }

  function displayUsers(){
    // console.log("input")
    const userList = document.querySelector(".user-list");
    userList.innerHTML = '';
    const matchingNames = findMatchingName();
    matchingNames.forEach(name => {
        userList.innerHTML += `<li>${name}</li>`;
    });
    addListListener();
  }
  
  function selectUser(){
    fullName.innerHTML = this.innerHTML;
    displayUsers();
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
        history: tru
    }
    sendUserData(history, "write-history");
    //find person and add money to that user as well as who added it 
})