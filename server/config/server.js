import mongoose from "mongoose";

async function connectToDatabase(databaseUrl) {
  try {
    await mongoose.connect(databaseUrl);

    mongoose.connection.on("connected", () => {
      console.log("✅ Eduzone connected to MongoDB");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected");
    });
  } catch (e) {
    console.error("❌ Error while connecting to MongoDB:", e.message);

    setTimeout(() => {
      console.log("🔁 Retrying MongoDB connection...");
      connectToDatabase(databaseUrl)
        .then(() => {
          console.log("🔄 Reconnected to MongoDB successfully!");
        })
        .catch((error) => {
          console.error("❌ Failed to reconnect to MongoDB:", error.message);
        });
    }, 5000);
  }
}

export default connectToDatabase;
