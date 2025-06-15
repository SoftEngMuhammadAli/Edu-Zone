const mongoose = require("mongoose");

async function connectToDatabase(databaseUrl) {
  try {
    await mongoose.connect(databaseUrl);
    console.log("Eduzone is connected to database successfully!");
  } catch (e) {
    console.error("Error while connecting to database", e);
    process.exit(1);
  }
}

module.exports = connectToDatabase;
