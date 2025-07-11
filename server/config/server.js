import mongoose from "mongoose";

async function connectToDatabase(databaseUrl) {
  try {
    await mongoose.connect(databaseUrl);
    console.log("Eduzone is connected to the database successfully!");
  } catch (e) {
    console.error("Error while connecting to database:", e.message);

    // Retry connection logic
    setTimeout(() => {
      console.log("Retrying MongoDB connection...");
      connectToDatabase(databaseUrl)
        .then(() => {
          console.log("Reconnected to the database successfully!");
        })
        .catch((error) => {
          console.error("Failed to reconnect to the database:", error.message);
        });
    }, 5000);
  }
}

export default connectToDatabase;
