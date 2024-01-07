import { getAllUsers } from "./getUserData.js";

const leaderboard = document.querySelector(".leaderboard");

async function all() {
  const allUsers = await getAllUsers();
  return allUsers.result;
}


//TODO: make updateLeaderboard() function work exported when admin enters new value with react
// export default async function updateLeaderboard() {
const allUsers = await all();
allUsers.sort((a, b) => b.money - a.money);

let cnt = 0;
leaderboard.innerHTML = ``;
  for (let x in allUsers) {
    if (!allUsers[x].admin) {
      let listElement = `<li>Place: ${Number(cnt) + 1} Name/Surname: ${allUsers[x].name} ${allUsers[x].surname} Networth: ${allUsers[x].money}</li>`;
      leaderboard.innerHTML += listElement;
      cnt++;
    }
  }
// }

// updateLeaderboard();
