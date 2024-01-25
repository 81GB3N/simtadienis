const port = 4000;
const baseUrl = window.location.hostname === 'localhost' ? `http://localhost:${port}` : '';

export async function sendUserData(userData, page) {
  await fetch(`${baseUrl}/api/${page}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
}

export async function getUserData(name, surname, type='main') {
  const response = await fetch(
    `${baseUrl}/api/getuser?name=${name}&surname=${surname}&type=${type}`
  );
  const data = await response.json();
  return data;
}

export async function getAllUsers(){
  const response = await fetch(`${baseUrl}/api/getallusers`)
  const data = await response.json();
  return data;
}

export async function userExists(name, surname, type='main') {
  const userDagetUserData = await getUserData(name, surname, type);
  if(typeof userDagetUserData === 'undefined') return false;
  const usersAmount = Object.keys(userDagetUserData.result).length;
  return usersAmount > 0 ? true : false;
}
