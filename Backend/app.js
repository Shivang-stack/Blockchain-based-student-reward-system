require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const eventRoutes = require("./routes/event");
const blockRoutes = require("./routes/block");

const { application } = require("express");

//DB Connection
mongoose
  .connect( process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  });

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My Routes
app.get("/", (req, res) => {
  res.send("AnimeKart apis");
});

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", eventRoutes);
app.use("/api", blockRoutes);

//PORT
const port = process.env.PORT || 8000;

//Starting a server
app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
