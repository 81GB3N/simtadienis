

const port = 4000;

//depeding on what the current hostname is select baseurl
const baseUrl = window.location.hostname === 'localhost' ? `http://localhost:${port}` : '';

async function fetchData(userData, page) {
  const headers = {
      "Content-Type": "application/json",
  };

  // Retrieve the "user" item from localStorage
  const userItem = localStorage.getItem("user");

  // Check if "user" item exists and contains a token
  if (userItem) {
      // Parse the JSON string to extract the token
      const { token } = JSON.parse(userItem);
      if (token) {
          headers.authorization = `Bearer ${token}`;
      }
  }

  return await fetch(`${baseUrl}/api/${encodeURI(page)}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData),
      // timer: JSON.parse(localStorage.getItem("requests"))
  });
}


//send the user data to the specific page
export async function sendUserData(userData, page) {
  try {
    const response = await fetchData(userData, page);
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
    console.log(name, surname, password, type)
    const response = await fetchData({name: name, surname: surname, password: password, type: type},'check-password')
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
    console.log(data);
    return data;
  } catch (err) {
    console.log(err, "Error in userExists");
    throw err;
  }
}
// action: set delete get
export async function handleDriveData(name, surname, imgNum, action, img=undefined) {
  try{
    console.log("handling", name, surname, img, imgNum, action)
    const response = await fetchData({name: name, surname: surname, img: img, imgNum: imgNum}, `${action}-image`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err, "Error in handleDriveData");
    throw err;
  }
}