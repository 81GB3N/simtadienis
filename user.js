const user = document.querySelector(".username");
const moneyAmount = document.querySelector(".money-amount");
const logoutButton = document.querySelector(".logout");

function logout(){
    localStorage.removeItem("user")
    document.location.href = "http://localhost:5500/index.html";
}

logoutButton.addEventListener('click', logout);

// console.log(localStorage.getItem("user") !== null);

if(localStorage.getItem("user") !== null){
    const userData = JSON.parse(localStorage.getItem("user"));
    user.innerHTML = `${userData.name} ${userData.surname}`;
}
else logout();