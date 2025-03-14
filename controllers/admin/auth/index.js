import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../../../models/admin_models/adminSchema.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }

    const hashedPassword = await bcrypt.hash("adminPassword", 10);
    const hashedPassword1 = "adminPassword";
    const isMatch2 = await bcrypt.compare(hashedPassword1, hashedPassword);
    console.log(isMatch2, hashedPassword1, hashedPassword);
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
