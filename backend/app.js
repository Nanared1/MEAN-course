const express = require("express");
const path = require('path');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://nanared1:' + process.env.MONGO_ATLAS_PW + '@cluster0-ip0fk.mongodb.net/node-angular?w=majority', { useNewUrlParser: true })
  .then(() => console.log("connected to database"))
  .catch(() => console.log("conenction failed"));

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, OPTIONS, PUT');
  next();
});
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use('/images', express.static(path.join('images')));


server.get("/", (req, res) => {
  res.send("Hello From MEAN Stack :)")
});
server.use("/api/posts", postRoutes);
server.use("/api/user", userRoutes);

module.exports = server;
