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

export async function getUserData(name, surname) {
  const response = await fetch(
    `${baseUrl}/api/getuser?name=${name}&surname=${surname}`
  );
  const data = await response.json();
  return data;
}

export async function getAllUsers(){
  const response = await fetch(`${baseUrl}/api/getallusers`)
  const data = await response.json();
  return data;
}

export async function userExists(name, surname) {
  const userData = await getUserData(name, surname);
  const usersAmount = Object.keys(userData.result).length;
  return usersAmount > 0 ? true : false;
}
