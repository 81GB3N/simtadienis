const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.URI;
const main = "main";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  minPoolSize: 10,
});

const database = client.db("my-test-db");

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

const writeDocument = async (registerData) => {
  try {
    let collection;
    if (registerData.history === undefined) {
      collection = database.collection("main");
    } else {
      collection = database.collection("history");
    }

    await collection.insertOne(registerData);
  } catch (error) {
    console.error(error);
  }
};

async function getCurrentMoney(name, surname, type) {
  const user = await findUser(name, surname, type);
  return Number(user[0].money);
}

const retrieveDocument = async () => {
  try {
    const collection = database.collection(main);
    const projection = { name: 1, surname: 1, money: 1, _id: 0};
    
    const cursor = collection.find({}).project(projection);
    const documents = await cursor.toArray();
    
    return documents;
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (updateMoney) => {
  try {
    const collection = database.collection(main);
    const currentMoney = await getCurrentMoney(
      updateMoney.name,
      updateMoney.surname,
      main
    );

    const result = await collection.updateOne(
      { name: updateMoney.name, surname: updateMoney.surname },
      { $set: { money: currentMoney + Number(updateMoney.money) } }
    );

    console.log("Document updated successfully", result);
  } catch (error) {
    console.error(error);
  }
};

const findUser = async (name, surname, type) => {
  try {
    const collection = database.collection(type);
    const query = { name: name, surname: surname };
    const cursor = collection.find(query);
    const documents = await cursor.toArray();
    return documents;
  } catch (error) {
    console.error(error);
  }
};

process.on("SIGINT", async () => {
  await client.close();
  process.exit();
});

module.exports = {
  writeDocument,
  findUser,
  updateUser,
  retrieveDocument,
};
