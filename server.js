const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = +process.env.PORT || 3000;
const URI = process.env.URI;
const DATABASE = process.env.DATABASE;
const DBCOLLECTION = process.env.DBCOLLECTION;

const client = new MongoClient(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.use(express.json());

app.get("/users/", async (_, res) => {
  const connection = await client.connect();
  const data = await connection
    .db(DATABASE)
    .collection(DBCOLLECTION)
    .find()
    .toArray();

  await connection.close();

  res.send(data).end;
});

app.post("/user", async (req, res) => {
  const { name, password, email } = req.body;

  if (
    typeof name !== "string" ||
    typeof password !== "string" ||
    typeof email !== "string"
  ) {
    res.status(400);
    res.send({ message: "your name, password or email is invalid" });
    res.end;
    return;
  }
  try {
    const con = await client.connect();
    const dbRes = await con
      .db(DATABASE)
      .collection(DBCOLLECTION)
      .insertOne({ name: name, password: password, email: email });
    await con.close();
    return res.send(dbRes);
  } catch (err) {
    res.status(500).send({ err });
  }
});

app.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const { name, password, email } = req.body;
  try {
    const con = await client.connect();
    const db = con.db(DATABASE);

    const user = await db
      .collection(DBCOLLECTION)
      .findOneAndUpdate(
      
        { _id: ObjectId(id) },
        { $set: { name, password, email } }
      );

    await con.close();

    res.send(user).end();
  } catch (error) {
    return res.send({ error }).res.end();
  }
});

app.delete("/user/delete-user", async (req, res) => {
  const { name, password, email } = req.body;
  const connection = await client.connect();
  const data = await connection
    .db(DATABASE)
    .collection(DBCOLLECTION)
    .deleteOne({ name: name, password: password, email: email });

  await connection.close();

  res.send(data).end;
});

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
