require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const connectToDatabase = require("./config/server");
const userRouter = require("./routes/users/user_router");
const benefitRouter = require("./routes/edu-benefits/edu_benefits");

app.use(express.json());
app.use(express.urlencoded());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "docs.html"));
});

// Mount user routes
app.use("/api/users", userRouter);

// Eduzone benefits Route
app.use("/api/benefits", benefitRouter);

const uri =
  process.env.DB_CONFIGURATION ||
  `mongodb://localhost:27017/${process.env.DEVELOPMENT_DATABASE_NAME}`;
connectToDatabase(uri);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
