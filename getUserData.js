export async function sendUserData(userData, page) {
  await fetch(`http://localhost:3000/${page}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

export async function getUserData(name, surname) {
  const response = await fetch(
    `http://localhost:3000/api?name=${name}&surname=${surname}`
  );
  const data = await response.json();
  return data;
}

export async function checkUserStatus(name, surname) {
  const userDagetUserData = await getUserData(name, surname);
  const usersAmount = Object.keys(userDagetUserData.result).length;
  return usersAmount > 0 ? true : false;
}
