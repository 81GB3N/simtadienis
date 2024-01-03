import { getUserData } from "./getUserData.js";

const user = document.querySelector(".username");
const moneyAmount = document.querySelector(".money-amount");
const logoutButton = document.querySelector(".logout");

function logout(){
    localStorage.removeItem("user")
    document.location.href = "http://localhost:5500/index.html";
}

logoutButton.addEventListener('click', logout);

// console.log(localStorage.getItem("user") !== null);

if(localStorage.getItem("user") === null) logout()

const userData = JSON.parse(localStorage.getItem("user"));
user.innerHTML = `${userData.name} ${userData.surname}`;

async function getMoneyAmount(){
const allData = await getUserData(userData.name, userData.surname);
const data = await allData;
return data.result[0].money;
}

const userMoney = await getMoneyAmount();

moneyAmount.innerHTML = userMoney;
