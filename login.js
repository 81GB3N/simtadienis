import fetchUserData from "./fetchUserData";

const loginForm = document.querySelector(".login-form");

// async function fetchUserData(userData) {
//   await fetch("http://localhost:3000/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   })
//     .then((response) => response.json())
//     .then((data) => console.log(data))
//     .catch((error) => console.error("Error:", error));
// }

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const surname = document.querySelector("#surname").value;
  const password = document.querySelector("#password").value;

  const userData = {
    name: name,
    surname: surname,
    password: password,
};

  // Check for valid password or other validations if needed
  fetchUserData(userData, "login");
});