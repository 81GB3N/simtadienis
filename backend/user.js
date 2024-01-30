import { getUserData } from "./getUserData.js";

const user = document.querySelector(".username");
const moneyAmount = document.querySelector(".money-amount");
const logoutButton = document.querySelector(".logout");

function logout(){
    localStorage.removeItem("user")
    document.location.href = "./index.html";
}

function loginAdmin(){
    document.location.href = "./admin.html";
}

logoutButton.addEventListener('click', logout);

if(localStorage.getItem("user") === null) logout()
else if(JSON.parse(localStorage.getItem("user")).admin === true) loginAdmin();

const userData = JSON.parse(localStorage.getItem("user"));
user.innerHTML = `${userData.name} ${userData.surname}`;

async function getMoneyAmount(){

const type='main';

//gets specifies user data
const allData = await getUserData(userData.name, userData.surname, type);
const data = await allData;
return data.result[0].money;
}

const history = document.querySelector('.history');

//gets and displays this user history 
async function getUserHistory(){

    const type='history';
    history.innerHTML = '';
    const thisUserHistory = await getUserData(userData.name, userData.surname, type);
    const data = await thisUserHistory;
    for(let x in data.result){
        history.innerHTML+=`<li>${data.result[x].adminname} ${data.result[x].adminsurname} sent you ${data.result[x].amount} at ${data.result[x].time}</li>`
    }
}

const userMoney = await getMoneyAmount();

moneyAmount.innerHTML = userMoney;


getUserHistory();