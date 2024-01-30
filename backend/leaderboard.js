import { getAllUsers } from "./getUserData.js";

const leaderboard = document.querySelector(".leaderboard");

async function all() {
  //get all user data
  const allUsers = await getAllUsers();
  return allUsers.result;
}

const allUsers = await all();
allUsers.sort((a, b) => b.money - a.money);

let cnt = 0;
leaderboard.innerHTML = ``;
//display all user data in leaderboard
  for (let x in allUsers) {
    if (!allUsers[x].admin) {
      let listElement = `<li>Place: ${Number(cnt) + 1} Name/Surname: ${allUsers[x].name} ${allUsers[x].surname} Networth: ${allUsers[x].money}</li>`;
      leaderboard.innerHTML += listElement;
      cnt++;
    }
  }
