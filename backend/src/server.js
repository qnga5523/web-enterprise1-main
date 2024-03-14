const express = require("express");
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("../routes/auth");
const eventRouter = require("../routes/main");

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB", err));
  
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser())
app.use(express.json())
//app.use(session({secret: 'some secrets'}));

//routes
app.use("/", authRoute);
app.use("/event",eventRouter);

app.listen(process.env.port || 5000);
console.log('Web Server is listening at port '+ (process.env.port|| 5000));

