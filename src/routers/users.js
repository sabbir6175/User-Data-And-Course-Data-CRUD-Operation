
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