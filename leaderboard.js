import { getAllUsers } from "./getUserData.js";

const leaderboard = document.querySelector(".leaderboard");

async function all(){
    const allUsers = await getAllUsers();
    // console.log(allUsers.result);
    return allUsers.result;
}

// const allUsers = all();
const allUsers = await all();
allUsers.sort((a,b)=>b.money-a.money);
console.log(allUsers);
leaderboard.innerHTML = ``;
let cnt = 0;
for(let x in allUsers){
    if(!allUsers[x].admin){
        let listElement = `<li>Place: ${Number(cnt)+1} Name/Surname: ${allUsers[x].name} ${allUsers[x].surname} Networth: ${allUsers[x].money}</li>`;
        leaderboard.innerHTML += listElement;
        cnt++;
    }
}
// console.log(allUsers)

// allUsers.sort((a,b)=>a.money - b.money);

