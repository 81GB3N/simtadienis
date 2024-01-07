const port = 4000;

// export async function sendPort(){ TODO: figure out how to get consistent port
//   await fetch(`http://localhost:${port}/port`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(port),
//   })
// }

export async function sendUserData(userData, page) {
  await fetch(`http://localhost:${port}/api/${page}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
}

export async function getUserData(name, surname) {
  const response = await fetch(
    `http://localhost:${port}/api/getuser?name=${name}&surname=${surname}`
  );
  const data = await response.json();
  return data;
}

export async function getAllUsers(){
  const response = await fetch(`http://localhost:${port}/api/getallusers`)
  const data = await response.json();
  return data;
}

export async function checkUserStatus(name, surname) {
  const userDagetUserData = await getUserData(name, surname);
  const usersAmount = Object.keys(userDagetUserData.result).length;
  return usersAmount > 0 ? true : false;
}
