const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
mongoose.set("strictQuery", false);

const PORT = process.env.PORT || 8000 ;
app.use(cors());

app.use(bodyParser.json());

const url = process.env.Mongo_URL;

const authRoute = require("./Routes/authRoute");
const protectedRoute = require("./Routes/protectedRoute");

app.use("/auth",authRoute);
app.use("/protected", protectedRoute);

mongoose.connect(url)
.then(() => console.log("MongoDB is connected..."))
.catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

