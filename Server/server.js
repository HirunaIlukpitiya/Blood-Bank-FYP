const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080 ;
app.use(cors());

app.use(bodyParser.json());

const url = process.env.MONGO_URL;

const authRoute = require("./Routes/authRoute");
const protectedRoute = require("./Routes/protectedRoute");
const userRoute = require("./Routes/userRoute");
const donorRoute = require("./Routes/donorRoute");
const stockDataRoute = require("./Routes/stockDataRoute");

app.use("/donor",donorRoute);
app.use("/user",userRoute);
app.use("/auth",authRoute);
app.use("/protected", protectedRoute);
app.use("/stockData", stockDataRoute);


mongoose.connect(url)
.then(() => console.log("MongoDB is connected..."))
.catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});