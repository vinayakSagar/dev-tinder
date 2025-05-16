const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
const port = 8080;

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send("User added sucessfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/user", async (req, res) => {
  const email = req.body.emailId;

  try {
    const users = await User.find({ emailId: email });
    if (users.length === 0) {
      res.status(404).send("User not found");
    }
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const updatedData = await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
    res.send(updatedData);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection establised sucessfully....");
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
