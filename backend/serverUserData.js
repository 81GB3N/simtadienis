const { writeDocument, findUser, updateUser, retrieveDocument } = require("./db");
const { encrypt } = require("./encryptPassword");
const { checkPassword } = require("./checkUserPassword");
const { initializeSocket } = require("./socket");
const { verifyToken, generateJWT, getJWT } = require("./handlingJWT.js");
const { uploadToDrive, deleteFromDrive, retrieveFileId } = require("./handleDriveImages.js");

const http = require("http");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

dotenv.config();
//icrease the limit for the google drive images
app.use(bodyParser.json({ limit: "25mb", extended: true }));
app.use(cors());
const server = http.createServer(app);
const io = initializeSocket(server);

//gets all user information without password and tokens
app.get("/api/getallusers", async (req, res, next) => {
  try {
    const result = await retrieveDocument();
    res.json({ result });
  } catch (err) {
    next(err);
  }
});

//UNSED RETRIEVE SUPER ADMIN TOKEN
// app.get("/api/ssas", async (req, res, next) => {
//   try {
//     //gets super admin token
//     const token = await getJWT(
//       "ab87b68a7rebea68a7b6a",
//       "aer78ae7b867ab68ea876ab"
//     );
//     console.log(token);
//     res.json({ token });
//   } catch (err) {
//     next(err);
//   }
// });

//gets user information specifies without password
app.post("/api/getuser", async (req, res, next) => {
  try {
    const user = req.body;
    //find the user with the requestred info
    const result = await findUser(user.name, user.surname);
    result ? res.json({ response : result }) : res.json({ result: "User not found" });
  } catch (err) {
    next(err);
  }
});

//recieving user data to check for the password
app.post("/api/check-password", async (req, res, next) => {
  try {
    const user = req.body;
    console.log(user);
    //comapre given pasword with the one in the database
    const result = await checkPassword(
      user.name,
      user.surname,
      user.type,
      user.password
    );
    console.log(result);
    res.json({ result });
  } catch (err) {
    next(err);
  }
});

app.post("/api/check-status", async (req, res, next) => {
  try {
    const user = req.body;
    const type = user.type;
    //check if user exists
    const result = await findUser(user.name, user.surname, type);
    console.log(result);
    result[0] ? res.json(true) : res.json(false);
  } catch (err) {
    next(err);
  }
});

//writes user data by registering
app.post("/api/register", async (req, res, next) => {
  try {
    const register = req.body;
    //encrypts the password before registering
    register.password = await encrypt(register.password);
    //generates a token for that user
    register.token = generateJWT(register, "user");
    console.log("generated user token: ", register.token);
    writeDocument(register);

    //emits a socket messege upon registering
    io.emit("getusers");

    res.json({ message: "Registration successful" });
  } catch (err) {
    next(err);
  }
});

//writes user history to history collection
//UNUSED
// app.post("/api/write-history", (req) => {
//   const history = req.body;
//   //invoke in addmoney
//   writeDocument(history, "history");
// });

//super admin function to register admins
app.post("/api/register-admin", verifyToken, async (req) => {
  try {
    //checks token for right role
    console.error("register admin role:", req.payload.role);

    if (req.payload.role == "super admin") {
      const admin = req.body;

      //encrypts the admin password
      admin.password = await encrypt(admin.password);
      //generates the token for that user
      admin.token = generateJWT(admin, "admin");

      console.log("generated admin token: ", admin.token);
      writeDocument(admin, "admin");
    } else {
      return res.status(401).json({ error: "Unauthorized request" });
    }
  } catch (err) {
    next(err);
  }
});

//uodates user money
app.post("/api/addmoney", verifyToken, (req, res) => {
  //checks status of requesting user
  console.log("role in addmoney: ", req.payload.role);
  if (req.payload.role === "admin") {
    const money = req.body;
    if (!money.money || isNaN(money.money)) {
      res.status(400).json({ error: "Invalid money format" });
    }
    updateUser(money);
    io.emit("getusers");
    res.json({ response: "Money Successfully Updated" });
  } else {
    return res.status(401).json({ error: "Unauthorized request" });
  }
});

app.post("/api/update-picture", verifyToken, (req, res, next) => {
  try {
    //checks if the right person is accesing his data
    const picture = req.body;
    if (req.payload.name === picture.name && req.payload.surname === picture.surname) {
      updateUser(picture);
      res.json({ response: "Image Successfully Updated" });
    } else {
      return res.status(401).json({ error: "Unauthorized request" });
    }
  } catch (err) {
    next(err);
  }
});

app.post("/api/set-image", verifyToken, async (req, res, next) => {
  try {
    const data = req.body;
    if (data.name === req.payload.name && data.surname === req.payload.surname) {
      console.log("uploadin image", data);
      //uploads user selected image to the drive
      await uploadToDrive(data);
      res.json({ response: "Image Successfully Uploaded" });
    } else {
      console.log("wrong user set");
    }
  } catch (err) {
    next(err);
  }
});

app.post("/api/get-image", verifyToken, async (req, res, next) => {
  try {
    const data = req.body;
    console.log("---------------------CHROME CHECK--------------------------");
    console.log(data, " VS ", req.payload);
    if (data.name === req.payload.name && data.surname === req.payload.surname) {
      // firefox goes here
      console.log("-----------------CHECKPOINT PASSED----------------");
      //retrieves the file id for the image with the users name and surname
      const response = await retrieveFileId(data);
      res.json({ response });
    } else {
      // chrome goes here
      console.log(
        "wrong user get",
        req.payload.name,
        req.payload.surname,
        data
      );
    }
  } catch (err) {
    next(err);
  }
});

app.post("/api/delete-image", verifyToken, async (req, res, next) => {
  try {
    const data = req.body;
    if (data.name === req.payload.name && data.surname === req.payload.surname) {
      //removes the user image picture from the dabtabase
      await deleteFromDrive(data);
      res.json({ response: "Image Successfully Deleted" });
    } else {
      console.log("wrong user delete");
    }
  } catch (err) {
    next(err);
  }
});


const chat_messages = [
  {
    user: "Admin",
    content: "Welcome to the chat",
    time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
  },
];

const MINUTE_DELAY = 2; // in mi
const AD_INTERVAL = 1000 * 60 * MINUTE_DELAY; // in ms

(() => {
  setInterval(() => {
    if (chat_messages[chat_messages.length - 1]?.ad) {
      console.log("ad already exists");
      return;
    }
    const adMessage = {
      user: "Weborado",
      content: '',
      time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
      ad: true
    }
    chat_messages.push(adMessage)
    io.emit('chat', adMessage);
  }, AD_INTERVAL);
})();

// todo: make pagination

app.post("/api/get-chat", (req, res) => {
  res.json({ payload: chat_messages });
});

app.post("/api/send-chat", (req, res) => {
  try {
    const message = req.body;
    chat_messages.push(message);
    console.log("emitting io message: ", message);
    io.emit("chat", message);
    res.json({ response: "Message Sent" });
  } catch (err) {
    next(err);
  }
});

app.post("/api/admin-token", verifyToken, async (req, res, next) => {
  try {
    const status = req.payload.role === "admin";
    console.log(status);
    res.json({ status });
  } catch (err) {
    next(err);
  }
});

//error handling function
app.use((err, req, res, next) => {
  console.error(err.stack);
  // res.status(500).send('Something broke!')
  res.status(500).json({ error: err });
});

server.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
