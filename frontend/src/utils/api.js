

const port = 4000;

//depeding on what the current hostname is select baseurl
const baseUrl = window.location.hostname === 'localhost' ? `http://localhost:${port}` : '';

//send the user data to the specific page
export async function sendUserData(userData, page) {
  await fetch(`${baseUrl}/api/${encodeURI(page)}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
}

//get specific user data: name, surname, money
export async function getUserData(name, surname, type = "main") {
  const userData = {
    name: name,
    surname: surname,
    type: type,
  }
  const response = await fetch(`${baseUrl}/api/getuser`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
}

//sending user data to check if the suplied password matches with the required
export async function validatePassword(name, surname, password, type="main") {
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
  const data = await response.json();
  return data;
}

//get all user information without password
export async function getAllUsers(){
  const response = await fetch(`${baseUrl}/api/getallusers`)
  const data = await response.json();
  return data;
}

export async function userExists(name, surname, type="main") {
  const userData = {
    name: name,
    surname: surname,
    type: type,
  }
  const response = await fetch(`${baseUrl}/api/check-status`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const data = await response.json();
  return data;
}

// const port = 4000;
// const baseUrl = window.location.hostname === 'localhost' ? `http://localhost:${port}` : '';

// export async function sendUserData(userData, page) {
//   try {
//     console.log('sending from: ', page)
//     const response = await fetch(`${baseUrl}/api/${page}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     })
//     // TODO: Think on where to handle errors? 
//     // Currently erros in addmoney are propogated to the component
//     // if (!response.ok) throw new Error('Something went wrong')
//     const responseBody = await response.json();
//     return responseBody;
//   }
//   catch (err) {
//     console.log("Error in sendUserData")
//     throw err;
//   }
// }

// export async function getUserData(name, surname, type = 'main') {
//   try {
//     const response = await fetch(
//       `${baseUrl}/api/getuser?name=${name}&surname=${surname}&type=${type}`
//     );
//     if (!response.ok) throw new Error('Something went wrong');
//     const data = await response.json();
//     return data;
//   }
//   catch (err) {
//     console.log("Error in getUserData");
//     throw err;
//   }
// }

// export async function getAllUsers() {
//   try {
//     const response = await fetch(`${baseUrl}/api/getallusers`)
//     if (!response.ok) throw new Error('Something went wrong');
//     const data = await response.json();
//     return data;
//   }
//   catch (err) {
//     console.log("Error in getAllUsers");
//     throw err;
//   }
// }

// export async function userExists(name, surname, type = 'main') {
//   try {
//     const userData = await getUserData(name, surname, type);
//     if (typeof userData === 'undefined') return false;
//     const usersAmount = Object.keys(userData.result).length;
//     return usersAmount > 0 ? true : false;
//   } catch (err) {
//     console.log("Error in userExists");
//     throw err;
//   }
// }

// export async function validatePassword(name, surname, password, type = 'main') {
//   try {
//     const response = await fetch(
//       `${baseUrl}/api/check-password?name=${name}&surname=${surname}&password=${password}&type=${type}`
//     );
//     if (!response.ok) throw new Error('Something went wrong');
//     const data = await response.json();
//     return data.result;
//   } catch (err) {
//     console.log("Error in validatePassword");
//     throw err;
//   }
// }


//checks if the user exists