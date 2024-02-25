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

const database = client.db("my-test-db");

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
const writeDocument = async (registerData) => {
  try {
    let collection;
    if (registerData.history === undefined) {
      collection = database.collection(main);
    } else {
      collection = database.collection("history");
    }

    await collection.insertOne(registerData);
  } catch (error) {
    console.error(error);
  }
};

//find the given user money in the history collection
async function getCurrentMoney(name, surname, type) {
  const user = await findUser(name, surname, type);
  return Number(user[0].money);
}

function findKey(updateInfo){
  for(let key in updateInfo){
    if(key !== "name" && key !== "surname"){
      return key;
    }
  }
}

//get all the data requested for all the users
const retrieveDocument = async () => {
  try {
    const collection = database.collection(main);
    const projection = { name: 1, surname: 1, money: 1, _id: 0};
    //find collection collums
    const cursor = collection.find({}).project(projection);
    const documents = await cursor.toArray();
    
    return documents;
  } catch (error) {
    console.error(error);
  }
};

//update the given user with the given information
const updateUser = async (updateInfo) => {
  try {
    const collection = database.collection(main);

    let money;
    
    if(updateInfo.money){
      money = await getCurrentMoney(
      updateInfo.name,
      updateInfo.surname,
      main
      )+Number(updateInfo.money);}

        // find the key requested for updating
      const key = findKey(updateInfo);

      console.log(key, [key], updateInfo[key])

    //update the users information
    const result = await collection.updateOne(
      { name: updateInfo.name, surname: updateInfo.surname },
      { $set: { [key]: updateInfo[key] } }
    );

    console.log("Document updated successfully", result);
  } catch (error) {
    console.error(error);
  }
};

//find user and its info on the given data
const findUser = async (name, surname, type, getPassword) => {
  try {
    // added getPassword variable to know when to call for password extraction and when for everything other
    const collection = database.collection(type);
    const query = { name: name, surname: surname };
    let cursor;
    if(getPassword === undefined){
      const projection = {name: 1, surname: 1, money: 1, _id: 0, admin: 1, imgSrc: 1, galleryCnt: 1};
      cursor = collection.find(query).project(projection);
    }
    else{
      //get only the password for the requested user
      cursor = collection.find(query);
      const document = await cursor.toArray();
      return document[0].password;
    }
    const documents = await cursor.toArray();
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
};
