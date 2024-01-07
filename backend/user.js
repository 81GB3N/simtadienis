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
const allData = await getUserData(userData.name, userData.surname);
const data = await allData;
return data.result[0].money;
}

const userMoney = await getMoneyAmount();

moneyAmount.innerHTML = userMoney;
