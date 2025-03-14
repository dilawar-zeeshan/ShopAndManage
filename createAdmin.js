import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/admin_models/adminSchema.js";

// Load environment variables
dotenv.config();

// MongoDB Connection using environment variable
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function createAdmin() {
  try {
    const adminEmail = "zee@shan.com";
    const adminPassword = "shah1200";
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log("Admin already exists.");
      mongoose.disconnect();
      return;
    }

    //const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = new Admin({
      name: "Zeeshan",
      email: adminEmail,
      password: adminPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
