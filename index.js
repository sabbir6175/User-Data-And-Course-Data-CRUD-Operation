require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.vlz3r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const UserCollection = client.db("UsersAndCourse").collection("users");
    const courseCollection = client.db("UsersAndCourse").collection("course");

    //users data get
    app.get("/users", async (req, res) => {
      const result = await UserCollection.find().toArray();
      res.send(result);
    });

    //users data get
    app.get("/users/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const result = await UserCollection.findOne(query);
        if (result) {
          res.send(result);
        } else {
          res.status(404).send({ message: "User not found" });
        }
      } catch (error) {
        // Handle cases where the ID format is invalid
        res.status(400).send({ message: "Invalid user ID format" });
      }
    });

    //users data create
    app.post("/users", async (req, res) => {
      const NewUser = req.body;
      const result = await UserCollection.insertOne(NewUser);
      res.send(result);
      if (result.acknowledged) {
        res.status(201).json({
          message: "User created successfully",
        });
      } else {
        // Handle potential database errors
        res.status(500).json({
          message: "Failed to create user",
          error: "Database operation failed",
        });
      }
    });

    //specific users update
    app.put("/users/:id", async (req, res) => {
      const id = req.params.id;
      const UpdatedUser = req.body;
      const filter = { _id: new ObjectId(id) };
      const UpdatedDoc = {
        $set: {
          firstName: UpdatedUser.firstName,
          lastName: UpdatedUser.lastName,
          email: UpdatedUser.email,
          photo: UpdatedUser.photo,
          password: UpdatedUser.password,
        },
      };
      const result = await UserCollection.updateOne(filter, UpdatedDoc);
      res.send(result);
    });

    //delete users
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await UserCollection.deleteOne(query);
      res.send(result);
    });


    //course data get
    app.get("/course", async (req, res) => {
      const result = await courseCollection.find().toArray();
      res.send(result);
    });

    //course data get
    app.get("/course/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const query = {_id: new ObjectId(id) };
        const result = await courseCollection.findOne(query);
        if (result) {
          res.send(result);
        } else {
          res.status(404).send({ message: "User not found" });
        }
      } catch (error) {
        // Handle cases where the ID format is invalid
        res.status(400).send({ message: "Invalid user ID format" });
      }
    });

    //course data create
    app.post("/course", async (req, res) => {
      const NewUser = req.body;
      const result = await courseCollection.insertOne(NewUser);
      res.send(result);
      if (result.acknowledged) {
        res.status(201).json({
          message: "User created successfully",
        });
      } else {
        // Handle potential database errors
        res.status(500).json({
          message: "Failed to create user",
          error: "Database operation failed",
        });
      }
    });

    //specific course update
    app.put("/course/:id", async (req, res) => {
      const id = req.params.id;
      const UpdatedUser = req.body;
      const filter = { _id: new ObjectId(id) };
      const UpdatedDoc = {
        $set: {
          firstName: UpdatedUser.firstName,
          lastName: UpdatedUser.lastName,
          email: UpdatedUser.email,
          photo: UpdatedUser.photo,
          password: UpdatedUser.password,
        },
      };
      const result = await courseCollection.updateOne(filter, UpdatedDoc);
      res.send(result);
    });

    //delete course
    app.delete("/course/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await courseCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello Sir Your server is running");
});
app.listen(port, () => {
  console.log(`Example your server is running on the port ${port}`);
});
