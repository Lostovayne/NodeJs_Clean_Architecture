import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters long"],
    select: false, // Exclude password from query results by default
  },
  img: {
    type: String,
  },
  roles: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["USER_ROLE", "ADMIN_ROLE"], // Define allowed roles
  },
});

export const UserModel = mongoose.model("User", userSchema);
