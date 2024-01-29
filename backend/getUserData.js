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

export async function getUserData(name, surname, type) {
  const response = await fetch(
    `${baseUrl}/api/getuser?name=${name}&surname=${surname}&type=${type}`
  );
  const data = await response.json();
  return data;
}

//sending user data to check if the suplied password matches with the required
export async function confirmPassword(name, surname, password, type){
  const response = await fetch(
    `${baseUrl}/api/check-password?name=${name}&surname=${surname}&password=${password}&type=${type}`
  );
  const data = await response.json();
  return data;
}

export async function getAllUsers(){
  const response = await fetch(`${baseUrl}/api/getallusers`)
  const data = await response.json();
  return data;
}

export async function checkUserStatus(name, surname, type) {
  const data = await getUserData(name, surname, type);
  const usersAmount = Object.keys(data.result).length;
  return usersAmount > 0 ? true : false;
}
