const port = 4000;

//depeding on what the current hostname is select baseurl
const baseUrl = window.location.hostname === 'localhost' ? `http://localhost:${port}` : '';

//send the user data to the specific page
export async function sendUserData(userData, page) {
  await fetch(`${baseUrl}/api/${page}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
}

//get specific user data: name, surname, money
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

//get all user information without password
export async function getAllUsers(){
  const response = await fetch(`${baseUrl}/api/getallusers`)
  const data = await response.json();
  return data;
}


//checks if the user exists
export async function checkUserStatus(name, surname, type) {
  const data = await getUserData(name, surname, type);
  const usersAmount = Object.keys(data.result).length;
  return usersAmount > 0 ? true : false;
}
