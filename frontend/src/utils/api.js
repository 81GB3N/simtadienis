

const port = 4000;

//depeding on what the current hostname is select baseurl
const baseUrl = window.location.hostname === 'localhost' ? `http://localhost:${port}` : '';

//send the user data to the specific page
export async function sendUserData(userData, page) {
  try {
    const response = await fetch(`${baseUrl}/api/${encodeURI(page)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
    const responseBody = await response.json();
    return responseBody;
  } catch (err) {
    console.log("Error in sendUserData")
    throw err;
  }

}

//get specific user data: name, surname, money
export async function getUserData(name, surname, type = "main") {
  try {
    const userData = {
      name: name,
      surname: surname,
      type: type,
    }
    const response = await fetch(`${baseUrl}/api/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Something went wrong in getUserData');
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
    const userData = {
      name: name,
      surname: surname,
      password: password,
      type: type,
    }
    const response = await fetch(`${baseUrl}/api/check-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Something went wrong in validatePassword');
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

export async function userExists(name, surname, type = "main") {
  try {
    const userData = {
      name: name,
      surname: surname,
      type: type,
    }
    const response = await fetch(`${baseUrl}/api/check-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Something went wrong in userExists');
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error in userExists");
    throw err;
  }
}