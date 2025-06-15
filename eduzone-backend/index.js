require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
const connectToDatabase = require("./config/server");
const userRouter = require("./routes/users/user_router");

app.use(express.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "docs.html"));
});

// Mount user routes
app.use("/api/users", userRouter);

connectToDatabase(
  `mongodb://localhost:27017/${process.env.DEVELOPMENT_DATABASE_NAME}`
);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
