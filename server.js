const express = require("express");
const port = 3001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();

// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
const { authenticate } = require("./middlewares/auth");

// MODALS
const { User } = require("./modals/user");

//MONGODB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri).catch((err) => console.log(err));
mongoose.connection.on("error", (err) => {
  console.log(err);
});

// ROUTES

// // USER

app.post("/api/user", (req, res) => {
  console.log(req.body);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  user.save((err, doc) => {
    console.log(err);
    if (err) res.status(400).send(err);
    res.status(200).send(doc);
  });
});

app.post("/api/user/login", (req, res) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }, (err, user) => {
    console.log(user);
    if (!user) return res.json({ message: "User not found" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) throw err;
      if (!isMatch)
        return res.status(400).json({ message: "Password is incorrect" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).json(err);
        res.cookie("x_auth", user.token).send(user);
      });
    });
  });
});

app.get("/api/user/token", authenticate, (req, res) => {
  res.status(200).send(req.data);
});

app.get("/api/user/logout", (req, res) => {
  res.clearCookie("x_auth").send("cleared cookie");
});

// PRODUCTION 

app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "frontend/build", "index.html")
    );
  });
}
