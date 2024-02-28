

const port = 4000;

//depeding on what the current hostname is select baseurl
const baseUrl = window.location.hostname === 'localhost' ? `http://localhost:${port}` : '';

async function fetchData(userData, page, headers = {"Content-Type": "application/json",}){
  return await fetch(`${baseUrl}/api/${encodeURI(page)}`, {
    method: "POST",
    headers,
    body: JSON.stringify(userData),
  });
}

//send the user data to the specific page
export async function sendUserData(userData, page) {
  try {
    const url = `${baseUrl}/api/${encodeURI(page)}`;
    const headers = {
      "Content-Type": "application/json",
    };

    // Check if the endpoint is /addmoney
    // if (page === 'addmoney') {
    //   // Assuming you have a function to retrieve the bearer token
    //   const token = getToken(); // Implement this function to retrieve the token
    //   if (token) {
    //     headers.Authorization = `Bearer ${token}`;
    //   } else {
    //     throw new Error('Bearer token not available');
    //   }
    // }

    const response = await fetchData(userData, page, headers);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in sendUserData:", err);
    throw err;
  }
}


//get specific user data: name, surname, money
export async function getUserData(userData) {
  try {
    const response = await fetchData(userData,'getuser')
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in getUserData");
    throw err;
  }
}

//sending user data to check if the suplied password matches with the required
export async function validatePassword(name, surname, password, type = "main") {
  try {
    const response = await fetchData({name: name, surname: surname, password: password,type: type},'check-password')
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in validatePassword");
    throw err;
  }
}

//get all user information without password
export async function getAllUsers() {
  try {
    const response = await fetch(`${baseUrl}/api/getallusers`)
    if (!response.ok) throw new Error('Something went wrong in getAllUsers');
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in getAllUsers");
    throw err;
  }
}

export async function userExists(name, surname, type) {
  try{
    const response = await fetchData({name: name, surname: surname, type: type}, 'check-status');
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in userExists");
    throw err;
  }
}