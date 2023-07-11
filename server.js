const express = require("express");
const port = 3001;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require('http')
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const WebSocket = require('ws')
require("dotenv").config();
const app = express();
const server = http.createServer(app)


// MIDDLEWARES
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
const { authenticate } = require("./middlewares/auth");

// MODALS
const { User } = require("./modals/user");
const { Task } = require("./modals/task");

//MONGODB
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri).catch((err) => console.log(err));
mongoose.connection.on("error", (err) => {
  console.log(err);
});

// WEBSOCKET
const wss = new WebSocket.Server({server, path: '/ws'})
const clients = new Map()

wss.on('connection', (ws) => {
  let clientId = null
  console.log("A new client is connected")

  ws.on('login', (data) => {
    console.log("Received login event");
    clientId = data;
    clients.set(clientId,ws)
    console.log("client is named: "+ clientId)
  })

  ws.on('error', console.error);

  ws.on('message', (message) => {
    const { recipient, data } = JSON.parse(message);
    const recipientClient = clients.get(recipient)

    if(recipientClient){
      recipientClient.send(data);
    }
  });

  ws.on('close', ()=>{
    if(clientId){
      clients.delete(clientId)
    }
  })

  ws.send(JSON.stringify({ event: 'serverReady' }));
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

  user.save()
    .then(doc => {
      console.log(doc);
      res.status(200).send(doc);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(err);
    });
});

app.post("/api/user/login", async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (!user) {
      return res.json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    await user.generateToken();
    res.cookie("x_auth", user.token).send(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get("/api/user/token", authenticate, (req, res) => {
  res.status(200).send(req.data);
});

app.get("/api/user/logout", (req, res) => {
  res.clearCookie("x_auth").send("cleared cookie");
});

// // TASKS

app.post("/api/task/create", (req,res) => {
  const task = new Task({
    name: req.body.name, 
    model: req.body.model,
    description: req.body.description,
    size: req.body.size,
    color: req.body.color,
    quantity: req.body.quantity,
    task: req.body.task,
  });

  task.save()
    .then(doc => {
      console.log(doc);
      res.status(200).send(doc);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(err);
    });
});

app.get('/api/task/getUsers', async (req,res) => {
  try {
    const users = await User.find({admin: false})
    res.status(200).send(users)
  } catch (error) {
    res.status(400).json(error);
  }
})

app.get('/api/task/admin', async (req,res) => {
  try {
    const tasks = await Task.find()
    res.status(200).send(tasks)
  } catch (error) {
    res.status(400).json(error);
  }
})

app.get('/api/task/user', async (req,res) => {
  try {
    const tasks = await Task.aggregate([{
      $match: {
        name: req.query.name,
        $expr: {
          $ne: ["$progress", "$quantity"]
        }
      }
    }])
    res.status(200).send(tasks)
  } catch (error) {
    res.status(400).json(error);
  }
})

app.post('/api/task/update', async (req,res) => {
  const {_id,progress} = req.body
  try {
    const task = await Task.updateOne({_id},{$set: {progress}})
    res.status(200).send(task)
  } catch (error) {
    res.status(400).json(error);
  }
})

// PRODUCTION 

server.listen(port, () => {
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
