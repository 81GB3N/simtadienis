// // server.js

// const EventEmitter = require('events');
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // Import the cors middleware

// const eventEmitter = new EventEmitter();
// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(cors()); // Enable CORS for all routes


// const userData = {
// }

// app.post('/register', (req, res) => {
//     userData.register = req.body;
//     // Perform any validation or processing here
//     // For simplicity, let's just log the received data
//     console.log('register', userData.register);
//     // res.json({ message: 'Registration data received successfully' });
// });

// app.post('/login', (req, res) =>{
//     userData.login = req.body;
//     console.log('login' ,userData.login);
// })

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });

// // async function fetchUserData(userData) {
// //     await fetch("http://localhost:3000/register", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify(userData),
// //     })
// //       .then((response) => response.json())
// //       .then((data) => console.log(data))
// //       .catch((error) => console.error("Error:", error));
// // }
