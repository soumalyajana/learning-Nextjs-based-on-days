import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://soumalyajana2003_db_user:TyXKTefJqh6pZW6H@cluster0.ixrutqu.mongodb.net/",
      {
        dbName: "next-server-action-and-data-mutations", // ✅ Replace with your DB name
      }
    );
    console.log("🕉️ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  } finally {
    console.log("MongoDB connection attempt finished.");
  }
};

export default connectToDB;
