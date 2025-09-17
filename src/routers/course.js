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