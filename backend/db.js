const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.URI;
const main = "main";

//get client configuration
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  minPoolSize: 10,
});

const database = client.db("simtadienis");

//test connection to db
async function connect() {
  try {
    await client.connect();
    // Send a ping to confirm a successful connection
    await database.command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connect();

//write the given data to the specifies collection
const writeDocument = async (registerData, page=main) => {
  try {
    const collection = database.collection(page);
    await collection.insertOne(registerData);
    // registerData.status = page;
    // await database.collection("tokens").insertOne({name: registerData.name, surname: registerData.surname, token: registerData.token});
  } catch (error) {
    console.error(error);
  }
};

//find the given user money in the history collection
async function getCurrentMoney(name, surname) {
  const user = await findUser(name, surname);
  return Number(user[0].money);
}


//find object key specified
function findKey(updateInfo) {
  if (Object.keys(updateInfo).length !== 3) return null;

  for (let key in updateInfo) {
    if (key !== "name" && key !== "surname") {
      return key;
    }
  }
  return null;
}

//get all the data requested for all the users
const retrieveDocument = async (page=main) => {
  try {
    const collection = database.collection(page);
    const projection = { name: 1, surname: 1, money: 1, image: 1, _id: 0};
    //find collection collums
    const cursor = collection.find({}).project(projection);
    const documents = await cursor.toArray();

    return documents;
  } catch (error) {
    console.error(error);
  }
};

function toRegexInsensitive(value){
  return new RegExp('^' + value + '$', 'i')
}

//update the given user with the given information
const updateUser = async (updateInfo) => {
  try {
    const collection = database.collection(main);

    if (updateInfo.money) {
      updateInfo.money =
        (await getCurrentMoney(updateInfo.name, updateInfo.surname)) +
        Number(updateInfo.money);
    }

    // find the key requested for updating
    const key = findKey(updateInfo);

    if (!key) {
      console.error("incorrect object format");
      return;
    }


    //update the users information
    const result = await collection.updateOne(
      { name: toRegexInsensitive(updateInfo.name), surname: toRegexInsensitive(updateInfo.surname) },
      { $set: { [key]: updateInfo[key] } }
    );

    console.log("Document updated successfully");
    console.table(result);
  } catch (error) {
    console.error(error);
  }
};



//UNUSED
// const getUserToken = async (name, surname) =>{
//   const collection= database.collection("tokens");
//   const query = {name: toRegexInsensitive(name), surname: toRegexInsensitive(surname)};
//   const cursor = collection.find(query);
//   const document = await cursor.toArray();
//   return document[0].token;
// }

//find user and its info on the given data
const findUser = async (name, surname, page=main, getPassword) => {
  try {
    // added getPassword variable to know when to call for password extraction and when for everything other
// console.log(name, surname, page, password)
    const collection = database.collection(page);
    const query = { name: toRegexInsensitive(name), surname: toRegexInsensitive(surname) };
    let cursor;
    if (!getPassword) {
      // const projection = {name: 1, surname: 1, money: 1, _id: 0, admin: 1, imgSrc: 1, galleryCnt: 1};

      //gets everything accept the password and _id
      const projection = { _id: 0, password: 0, token: 0 };
      cursor = collection.find(query).project(projection);
    } else {
      //get only the password for the requested user
      cursor = collection.find(query);
      const document = await cursor.toArray();
      return document[0];
    }
    const documents = await cursor.toArray();
    // console.log(documents);
    return documents;
  } catch (error) {
    console.error(error);
  }
};

//close program after use
process.on("SIGINT", async () => {
  await client.close();
  process.exit();
});

//export used modules
module.exports = {
  writeDocument,
  findUser,
  updateUser,
  retrieveDocument,
  // getUserToken
};
